import { Request, Response, NextFunction } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import Card from '../models/card'
import { NotFoundError } from '../errors/NotFoundError'
import { ForbiddenError } from '../errors/ForbiddenError'
import { GetCurrentCardParams } from './types'
import { BadRequestError } from '../errors/BadRequestError'

export const getAllCards = async (_: Request, response: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({})

    response.status(StatusCodes.OK).send(cards)
  } catch (error) {
    next(error)
  }
}

export const createCard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { name, link } = request.body
    const owner = request.user._id

    const card = await Card.create({
      name,
      link,
      owner,
    })

    response.status(StatusCodes.CREATED).send(card)
  } catch (error) {
    next(error)
  }
}

export const deleteCard = async (request: Request<GetCurrentCardParams>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

    if (!cardId || !mongoose.Types.ObjectId.isValid(cardId)) {
      throw new BadRequestError('Invalid cardId')
    }

    const card = await Card.findById(cardId).orFail(new NotFoundError('Card not found'))

    const owner = request.user._id

    if (owner !== String(card.owner)) {
      throw new ForbiddenError(getReasonPhrase(StatusCodes.FORBIDDEN))
    }

    await card.deleteOne()

    response.status(StatusCodes.OK).send(card)
  } catch (error) {
    next(error)
  }
}

export const likeCard = async (request: Request<GetCurrentCardParams>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

    if (!cardId || !mongoose.Types.ObjectId.isValid(cardId)) {
      throw new BadRequestError('Invalid cardId')
    }

    const owner = request.user._id

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } },
      { returnDocument: 'after' },
    ).orFail(new NotFoundError('Card not found'))

    response.status(StatusCodes.OK).send(card)
  } catch (error) {
    next(error)
  }
}

export const dislikeCard = async (request: Request<GetCurrentCardParams>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

    if (!cardId || !mongoose.Types.ObjectId.isValid(cardId)) {
      throw new BadRequestError('Invalid cardId')
    }

    const owner = request.user._id

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: owner } },
      { returnDocument: 'after' },
    ).orFail(new NotFoundError('Card not found'))

    response.status(StatusCodes.OK).send(card)
  } catch (error) {
    next(error)
  }
}
