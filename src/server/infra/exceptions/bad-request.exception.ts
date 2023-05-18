export class BadRequestException extends Error {
    constructor(
        message = 'Bad Request',
        public readonly code = 400
    ) {
        super(message)
    }
}