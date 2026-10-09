import { NextFunction, Request, Response } from 'express'
import { isCelebrateError } from 'celebrate'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import mongoose from 'mongoose'
import { MongoError } from 'mongodb'
import { ErrorWithStatus } from '../errors/ErrorWithStatus'

const MONGO_DB_ERROR_CODE = 11000

export const errorsHandler = (error: ErrorWithStatus, _request: Request, response: Response, _next: NextFunction) => {
  console.error('Error from middlewares', error)

  const { message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR } = error

  if (error instanceof mongoose.Error.CastError) {
    return response.status(StatusCodes.BAD_REQUEST).send({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) })
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(StatusCodes.BAD_REQUEST).send({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) })
  }

  if (isCelebrateError(error)) {
    return response.status(StatusCodes.BAD_REQUEST).send({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) })
  }

  if (error instanceof MongoError && error.code === MONGO_DB_ERROR_CODE) {
    return response.status(StatusCodes.CONFLICT).send({ message: getReasonPhrase(StatusCodes.CONFLICT) })
  }

  if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
    return response.status(statusCode).send({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
  }

  return response.status(statusCode).send({ message })
}
