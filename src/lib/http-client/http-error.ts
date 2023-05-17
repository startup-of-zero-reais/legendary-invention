import { AxiosError } from "axios"

export class HttpError<T = any> extends Error {
	constructor(
		message = 'Internal Server Error',
		public readonly statusCode = 500,
		public readonly response: T = {} as any,
		public readonly stack?: any
	) {
		super(message)
	}

	static handle<T = any>(error: unknown): HttpError<T> {
		const err = error as AxiosError | Error;

		if (err instanceof AxiosError) {
			return new HttpError<T>(
				err.response?.data.message ?? err.response?.data.error ?? err.message,
				err.response?.status ?? err.status,
				err.response?.data,
				err.stack,
			)
		}

		return new HttpError<T>(
			err.message,
			undefined,
			undefined,
			err.stack
		)
	}
}
