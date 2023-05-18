import { HttpStatus } from "@/server/infra/http/status-codes";

export class HttpErrorException extends Error {
	constructor(
		message = 'Internal server error',
		public readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
	) {
		super(message);
	}

	public getStatus(): HttpStatus {
		return this.statusCode;
	}
}
