import { StatusCodes } from 'http-status-codes'

export class ErrorWithStatus extends Error {
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
}
