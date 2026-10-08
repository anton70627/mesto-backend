import { celebrate, Joi } from 'celebrate'

export const updateUserInfoValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }).required(),
})

export const updateUserAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }).required(),
})
