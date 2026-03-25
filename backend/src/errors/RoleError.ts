import { BaseError } from './CustomError';
import { HTTPStatusCode } from '../constants/http-status-codes';

export class RoleError extends BaseError {
  constructor(message: string) {
    super(message, HTTPStatusCode.Forbidden);
    Object.setPrototypeOf(this, RoleError.prototype);
  }
}
