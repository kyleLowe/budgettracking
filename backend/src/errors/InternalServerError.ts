import { HTTPStatusCode } from '../constants/http-status-codes';
import { BaseError } from './CustomError';

export class InternalServerError extends BaseError {
  constructor(message: string = 'Internal server error') {
    super(message, HTTPStatusCode.InternalServerError);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
