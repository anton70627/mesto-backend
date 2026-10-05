import { Router } from 'express'
import { createCard, deleteCard, dislikeCard, getAllCards, likeCard } from '../controllers/cards'
import { createCardValidate } from '../middlewares/cardsRouterValidate'

const cardsRouter = Router()

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

cardsRouter.get('/', getAllCards)
cardsRouter.post('/', createCardValidate, createCard)
cardsRouter.delete('/:cardId', deleteCard)
cardsRouter.put('/:cardId/likes', likeCard)
cardsRouter.delete('/:cardId/likes', dislikeCard)

export default cardsRouter
