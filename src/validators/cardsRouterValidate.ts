import { celebrate, Joi } from 'celebrate'

export const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }).required(),
})
