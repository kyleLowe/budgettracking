import { HTTPStatusCode } from "../constants/http-status-codes";
import { BaseError } from "./CustomError";

export class ConflictError extends BaseError {
  constructor(message: string = "Resource conflict") {
    super(message, HTTPStatusCode.Conflict);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
