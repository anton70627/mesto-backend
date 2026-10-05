import { Request, Response, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NotFoundError } from '../errors/NotFoundError'

export const notFoundHandler = (_request: Request, _response: Response, _next: NextFunction) => {
  throw new NotFoundError(getReasonPhrase(StatusCodes.NOT_FOUND))
}
