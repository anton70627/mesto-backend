import { Router } from 'express'
import {
  getAllUsers,
  getAuthorizedUser,
  getCurrentUser,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/users/users'
import { updateUserAvatarValidate, updateUserInfoValidate } from '../validators/usersRouterValidate'

const usersRouter = Router()

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

usersRouter.get('/', getAllUsers)
usersRouter.get('/me', getAuthorizedUser)
usersRouter.patch('/me', updateUserInfoValidate, updateUserInfo)
usersRouter.patch('/me/avatar', updateUserAvatarValidate, updateUserAvatar)
usersRouter.get('/:userId', getCurrentUser)

export default usersRouter
