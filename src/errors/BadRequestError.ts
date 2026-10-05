import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from './ErrorWithStatus'

export class BadRequestError extends ErrorWithStatus {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
