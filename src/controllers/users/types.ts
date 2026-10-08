import { UserSchema } from '../../models/user'

export type CreateUserBody = UserSchema

export type LoginBody = Pick<UserSchema, 'email' | 'password'>

export type UpdateUserBody = Pick<UserSchema, 'name' | 'about'>

export type UpdateAvatarBody = Pick<UserSchema, 'avatar'>

export type GetCurrentUserParams = { userId: string }
