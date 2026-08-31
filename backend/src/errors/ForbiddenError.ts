import { HTTPStatusCode } from "../constants/http-status-codes";
import { BaseError } from "./CustomError";

export class ForbiddenError extends BaseError {
  constructor(message: string = "Access is forbidden") {
    super(message, HTTPStatusCode.Forbidden);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
