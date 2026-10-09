import { NextFunction, Request, Response } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../errors/UnauthorizedError'
import { isVerifiedUserPayload } from '../services/isVerifiedUserPayload'

export const auth = (request: Request, _: Response, next: NextFunction) => {
  const { token } = request.cookies

  if (!token) {
    throw new UnauthorizedError(getReasonPhrase(StatusCodes.UNAUTHORIZED))
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('No JWT_SECRET')
  }

  try {
    const payload = jwt.verify(token, jwtSecret)

    if (typeof payload !== 'string' && isVerifiedUserPayload(payload)) {
      request.user = payload
    } else {
      throw new Error('Invalid jwt payload')
    }
  } catch (error) {
    throw new UnauthorizedError(getReasonPhrase(StatusCodes.UNAUTHORIZED))
  }

  next()
}
