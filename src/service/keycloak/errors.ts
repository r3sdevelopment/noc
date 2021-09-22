export class MissingConfigError extends Error {
    constructor(message?: string) {
        super(message);
        this.message = 'Missing url, realm or client ID';

        Object.setPrototypeOf(this, MissingConfigError.prototype);
    }
}

export class InvalidKeyError extends Error {
    constructor(message?: string) {
        super(message);
        this.message = 'Invalid JWT key';

        Object.setPrototypeOf(this, InvalidTokenError.prototype);
    }
}

export class InvalidTokenError extends Error {
    constructor(message?: string) {
        super(message);
        this.message = 'Invalid JWT token';

        Object.setPrototypeOf(this, InvalidTokenError.prototype);
    }
}
