import mongoose from 'mongoose'
import validator from 'validator'

export type UserSchema = {
  email: string,
  password: string,
  name?: string,
  about?: string,
  avatar?: string,
}

const userSchema = new mongoose.Schema<UserSchema>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Not valid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: 'Not valid avatar url',
    },
  },
})

export default mongoose.model<UserSchema>('user', userSchema)
