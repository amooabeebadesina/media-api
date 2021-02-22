
export class VyconException {

    constructor (readonly message: string, readonly code: number, readonly data: Record<string, unknown> = null) {
        this.message = message;
        this.code = code;
        this.data = data
    }

    getStatusCode(): number {
        return this.code;
    }

    getMessage(): string {
        return this.message;
    }

    getData(): Record<string, unknown> {
        return this.data;
    }

}

export class InvalidCredentialsException extends VyconException {

    constructor(message: string, code: number, data = null) {
        super(message, code, data);
    }
}

export class InvalidRequestTokenException extends VyconException {

    constructor(message: string, code = 401, data = null) {
        super(message, code, data);
    }
}
