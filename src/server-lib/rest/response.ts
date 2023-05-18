export class Resp<T = any> {
	private constructor(
		private statusCode: number = 200,
		private body: T | null = null,
		private headers = {},
	) {}

	static status(code: number) {
		return new Resp(code)
	}

	static json<T = object>(body: T) {
		return new Resp(200, body)
	}

	static writeHeader(key: string, value: string) {
		return new Resp(200, null, { [key]: value })
	}

	status(code: number) {
		this.statusCode = code;
		return this
	}

	json(body: T) {
		this.body = body

		Object.assign(this.headers, { 'Content-Type': 'application/json' })

		return this.end()
	}

	writeHeader(key: string, value: string) {
		Object.assign(this.headers, { [key]: value })
		return this
	}

	end() {
		return new Response(
			JSON.stringify(this.body),
			{
				status: this.statusCode,
				headers: this.headers,
			}
		)
	}
}
