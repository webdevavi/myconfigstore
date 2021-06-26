export interface IAppData {
	version: string
	server: "RUNNING" | "CRASHED" | "PAUSED"
}

export class AppData implements IAppData {
	version: string

	server: "RUNNING" | "CRASHED" | "PAUSED"

	constructor(appData: IAppData) {
		this.version = appData.version
		this.server = appData.server
	}

	toJSON() {
		return {
			version: this.version,
			server: this.server,
		}
	}
}
