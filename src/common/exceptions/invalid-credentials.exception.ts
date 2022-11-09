import {ForbiddenException} from '@nestjs/common';

export class InvalidCredentialsException extends ForbiddenException {
    constructor(error?: string) {
        super('error.invalid_credentials', error);
    }
}
