import {ForbiddenException} from '@nestjs/common';

export class InvalidCredentialsException extends ForbiddenException {
    constructor(error?: string) {
        super('error.user_not_found', error);
    }
}
