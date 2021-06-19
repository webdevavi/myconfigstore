import crypto from "crypto"

const encryptionType = "aes-256-cbc"
const encryptionEncoding = "base64"
const bufferEncryption = "utf-8"

export class Encrypt {
	private readonly aesKey: string = process.env.AES_KEY ?? ""

	encrypt(data: string) {
		const aesIv = crypto.randomBytes(12).toString(encryptionEncoding)

		const cipher = crypto.createCipheriv(encryptionType, Buffer.from(this.aesKey, bufferEncryption), Buffer.from(aesIv, bufferEncryption))
		let encrypted = cipher.update(JSON.stringify(data), bufferEncryption, encryptionEncoding)

		encrypted += cipher.final(encryptionEncoding)

		return aesIv + encrypted
	}

	decrypt(base64String: string) {
		const iv = base64String?.slice(0, 16)
		const buff = Buffer.from(base64String?.slice(16) ?? "", encryptionEncoding)
		const key = Buffer.from(this.aesKey, bufferEncryption)
		const decipher = crypto.createDecipheriv(encryptionType, key, iv)

		const decrypted = Buffer.concat([decipher.update(buff), decipher.final()])

		const deciphered = decrypted.toString(bufferEncryption)

		return JSON.parse(deciphered)
	}
}
