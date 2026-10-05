import { Router } from 'express'
import { createUser, getAllUsers, getCurrentUser, updateUserAvatar, updateUserInfo } from '../controllers/users'
import { createUserValidate, updateUserAvatarValidate, updateUserInfoValidate } from '../middlewares/usersRouterValidate'

const usersRouter = Router()

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

usersRouter.post('/', createUserValidate, createUser)
usersRouter.get('/', getAllUsers)
usersRouter.get('/:userId', getCurrentUser)
usersRouter.patch('/me', updateUserInfoValidate, updateUserInfo)
usersRouter.patch('/me/avatar', updateUserAvatarValidate, updateUserAvatar)

export default usersRouter
