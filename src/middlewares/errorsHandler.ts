import { NextFunction, Request, Response } from 'express'
import { isCelebrateError } from 'celebrate'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { ErrorWithStatus } from '../errors/ErrorWithStatus'

export const errorsHandler = (error: ErrorWithStatus, _request: Request, response: Response, _next: NextFunction) => {
  console.error('Error from middlewares', error)

  const { message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR } = error

  if (isCelebrateError(error)) {
    response.status(statusCode).send({ message: error.message })
  }

  if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
    response.status(statusCode).send({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
  }

  response.status(statusCode).send({ message })
}
