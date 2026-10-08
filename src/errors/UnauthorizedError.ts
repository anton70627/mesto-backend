import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from './ErrorWithStatus'

export class UnauthorizedError extends ErrorWithStatus {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
