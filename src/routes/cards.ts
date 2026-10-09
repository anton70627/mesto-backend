import { Router } from 'express'
import { createCard, deleteCard, dislikeCard, getAllCards, likeCard } from '../controllers/cards'
import { cardIdValidate, createCardValidate } from '../validators/cardsRouterValidate'

const cardsRouter = Router()

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

cardsRouter.get('/', getAllCards)
cardsRouter.post('/', createCardValidate, createCard)
cardsRouter.delete('/:cardId', cardIdValidate, deleteCard)
cardsRouter.put('/:cardId/likes', cardIdValidate, likeCard)
cardsRouter.delete('/:cardId/likes', cardIdValidate, dislikeCard)

export default cardsRouter
