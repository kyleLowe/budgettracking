import { BaseError } from "./CustomError";
import { HTTPStatusCode } from "../constants/http-status-codes";

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, HTTPStatusCode.NotFound);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
