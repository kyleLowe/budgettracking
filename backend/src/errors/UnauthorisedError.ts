import { HTTPStatusCode } from '../constants/http-status-codes';
import { BaseError } from './CustomError';

export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Unauthorized access') {
    super(message, HTTPStatusCode.Unauthorized);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
