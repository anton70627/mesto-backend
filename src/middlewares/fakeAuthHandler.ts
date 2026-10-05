import {
  NextFunction, Request, RequestHandler, Response,
} from 'express'

export const fakeAuthHandler: RequestHandler = (request: Request, _: Response, next: NextFunction) => {
  request.user = {
    _id: '6ac0feadc12bfa8476d3d616',
  }

  next()
}
