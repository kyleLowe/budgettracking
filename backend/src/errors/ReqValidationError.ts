import { HTTPStatusCode } from "../constants/http-status-codes";
import { BaseError } from "./CustomError";

export class ValidationError extends BaseError {
  constructor(message: string = "Bad request") {
    super(message, HTTPStatusCode.BadRequest);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
