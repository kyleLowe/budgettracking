import { HTTPStatusCode } from "../constants/http-status-codes";
import { BaseError } from "./CustomError";

export class NotAcceptableError extends BaseError {
  constructor(message: string = "Request not acceptable") {
    super(message, HTTPStatusCode.NotAcceptable);
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
  }
}
