import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from './ErrorWithStatus'

export class NotFoundError extends ErrorWithStatus {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}
