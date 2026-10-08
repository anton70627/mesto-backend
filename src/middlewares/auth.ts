import { NextFunction, Request, Response } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../errors/UnauthorizedError'
import { isVerifiedUserPayload } from '../services/users/isVerifiedUserPayload'

export const auth = (request: Request, _: Response, next: NextFunction) => {
  const { cookie } = request.headers

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('No JWT_SECRET')
  }

  if (!cookie && !cookie?.startsWith('token')) {
    throw new UnauthorizedError(getReasonPhrase(StatusCodes.UNAUTHORIZED))
  }

  const token = cookie?.replace('token=', '')

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
