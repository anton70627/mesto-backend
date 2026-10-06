import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import Card from '../models/card'
import { NotFoundError } from '../errors/NotFoundError'

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

export const deleteCard = async (request: Request<{ cardId: string }>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

    const card = await Card.findByIdAndDelete(cardId).orFail(new NotFoundError('Card not found'))

    response.status(StatusCodes.OK).send(card)
  } catch (error) {
    next(error)
  }
}

export const likeCard = async (request: Request<{ cardId: string }>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

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

export const dislikeCard = async (request: Request<{ cardId: string }>, response: Response, next: NextFunction) => {
  try {
    const { cardId } = request.params

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
