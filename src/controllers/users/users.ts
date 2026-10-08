import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import User from '../../models/user'
import { NotFoundError } from '../../errors/NotFoundError'
import { BadRequestError } from '../../errors/BadRequestError'
import { CreateUserBody, UpdateUserBody, UpdateAvatarBody, GetCurrentUserParams, LoginBody } from './types'
import { getHashPassword, checkPassword } from '../../services/users/hashPassword'
import { UnauthorizedError } from '../../errors/UnauthorizedError'
import { getJwtToken } from '../../services/users/jwtToken'
import { COOKIE_MAX_AGE } from '../../constants'

export const login = async (request: Request<{}, {}, LoginBody>, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body

    const user = await User.findOne({ email }).orFail(new UnauthorizedError('Incorrect email or password'))
    const isValidPassword = await checkPassword(password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedError('Incorrect email or password')
    }

    const token = getJwtToken(user.id)

    response.status(StatusCodes.NO_CONTENT).cookie(
      'token',
      token,
      {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      },
    ).end()
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (_: Request, response: Response, next: NextFunction) => {
  try {
    const users = await User.find({})

    response.status(StatusCodes.OK).send(users)
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = async (request: Request<GetCurrentUserParams>, response: Response, next: NextFunction) => {
  try {
    const { userId } = request.params

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError('Invalid userId')
    }

    const user = await User.findById(userId).orFail(new NotFoundError('User not found'))

    response.status(StatusCodes.OK).send(user)
  } catch (error) {
    next(error)
  }
}

export const getAuthorizedUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const owner = request.user.id

    const user = await User.findById(owner).orFail(new NotFoundError('User not found'))

    response.status(StatusCodes.OK).send(user)
  } catch (error) {
    next(error)
  }
}

export const createUser = async (request: Request<{}, {}, CreateUserBody>, response: Response, next: NextFunction) => {
  try {
    const { email, password, name, about, avatar } = request.body

    const hashPassword = await getHashPassword(password)

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      about,
      avatar,
    })

    const { password: _, ...userResponse } = user.toObject()

    response.status(StatusCodes.CREATED).send(userResponse)
  } catch (error) {
    next(error)
  }
}

export const updateUserInfo = async (request: Request<{}, {}, UpdateUserBody>, response: Response, next: NextFunction) => {
  try {
    const { name, about } = request.body

    const owner = request.user.id

    const user = await User.findByIdAndUpdate(
      owner,
      { name, about },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    ).orFail(new NotFoundError('User not found'))

    response.status(StatusCodes.OK).send(user)
  } catch (error) {
    next(error)
  }
}

export const updateUserAvatar = async (request: Request<{}, {}, UpdateAvatarBody>, response: Response, next: NextFunction) => {
  try {
    const { avatar } = request.body

    const owner = request.user.id

    const user = await User.findByIdAndUpdate(
      owner,
      { avatar },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    ).orFail(new NotFoundError('User not found'))

    response.status(StatusCodes.OK).send(user)
  } catch (error) {
    next(error)
  }
}
