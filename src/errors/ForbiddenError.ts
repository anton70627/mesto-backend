import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from './ErrorWithStatus'

export class ForbiddenError extends ErrorWithStatus {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
