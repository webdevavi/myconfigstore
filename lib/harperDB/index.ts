import axios, { AxiosResponse } from "axios"
import omitBy from "lodash/omitBy"
import isNil from "lodash/isNil"

export class HarperDB {
	private readonly baseURL = process.env.NEXT_PUBLIC_DB_ENDPOINT
	private readonly authToken = process.env.NEXT_PUBLIC_DB_AUTH_TOKEN

	constructor(public readonly schema: string) {}

	private readonly client = axios.create({
		baseURL: this.baseURL,
		headers: {
			Authorization: `Basic ${this.authToken}`,
			"Content-Type": "application/json",
		},
		method: "POST",
	})

	async insert<T>(options: { table: string; records: T[] }) {
		const data = JSON.stringify({
			operation: "insert",
			schema: this.schema,
			table: options.table,
			records: options.records.map((record) => omitBy(record, isNil)),
		})

		const {
			data: { inserted_hashes },
		} = await this.client({ data })
		return (inserted_hashes ?? []) as string[]
	}

	async findByIds<T>(ids: string[], options: { table: string; attributes?: string[] }) {
		const data = JSON.stringify({
			operation: "search_by_hash",
			schema: this.schema,
			table: options.table,
			hash_values: ids,
			get_attributes: options.attributes ?? ["*"],
		})

		return ((await this.client({ data })) as AxiosResponse<T[]>).data
	}

	async findByValue<T>(attribute: string, value: string, options: { table: string; attributes?: string[] }) {
		const data = JSON.stringify({
			operation: "search_by_value",
			schema: this.schema,
			table: options.table,
			search_attribute: attribute,
			search_value: value,
			get_attributes: options.attributes ?? ["*"],
		})

		return ((await this.client({ data })) as AxiosResponse<T[]>).data
	}

	async findByConditions<T>(
		operator: "and" | "or",
		conditions: {
			attribute: string
			type: "equals" | "contains" | "starts_with" | "ends_with" | "greater_than" | "greater_than_equal" | "less_than" | "less_than_equal" | "between"
			value: string
		}[],
		options: { table: string; attributes?: string[]; limit?: number; offset?: number }
	) {
		const data = JSON.stringify({
			operation: "search_by_conditions",
			schema: this.schema,
			table: options.table,
			operator,
			offset: options.offset ?? 0,
			limit: options.offset ?? 20,
			get_attributes: options.attributes ?? ["*"],
			conditions: conditions.map(({ attribute, type, value }) => ({ search_attribute: attribute, search_type: type, search_value: value })),
		})

		return ((await this.client({ data })) as AxiosResponse<T[]>).data
	}

	async update<T>(options: { table: string; records: ({ id: string } & Partial<T>)[] }) {
		const data = JSON.stringify({
			operation: "update",
			schema: this.schema,
			table: options.table,
			records: options.records.map((record) => omitBy(record, isNil)),
		})

		const {
			data: { update_hashes },
		} = await this.client({ data })
		return (update_hashes ?? []) as string[]
	}

	async upsert<T>(options: { table: string; records: T[] }) {
		const data = JSON.stringify({
			operation: "upsert",
			schema: this.schema,
			table: options.table,
			records: omitBy(options.records, isNil),
		})

		const {
			data: { upserted_hashes },
		} = await this.client({ data })
		return (upserted_hashes ?? []) as string[]
	}

	async delete<T>(ids: string[], options: { table: string }) {
		const data = JSON.stringify({
			operation: "delete",
			schema: this.schema,
			table: options.table,
			hash_values: ids,
		})

		const {
			data: { deleted_hashes },
		} = await this.client({ data })
		return (deleted_hashes ?? []) as string[]
	}
}
