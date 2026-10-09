import { Router } from 'express'
import {
  getAllUsers,
  getAuthorizedUser,
  getCurrentUser,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/users'
import { updateUserAvatarValidate, updateUserInfoValidate, userIdValidate } from '../validators/usersRouterValidate'

const usersRouter = Router()

// GET /users — возвращает всех пользователей
// GET /users/me — пользователя текущей сессии
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
// GET /users/:userId - возвращает пользователя по _id

usersRouter.get('/', getAllUsers)
usersRouter.get('/me', getAuthorizedUser)
usersRouter.patch('/me', updateUserInfoValidate, updateUserInfo)
usersRouter.patch('/me/avatar', updateUserAvatarValidate, updateUserAvatar)
usersRouter.get('/:userId', userIdValidate, getCurrentUser)

export default usersRouter
