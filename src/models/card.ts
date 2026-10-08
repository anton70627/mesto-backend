import mongoose, { Types } from 'mongoose'
import validator from 'validator'

type CardSchema = {
  name: string,
  link: string,
  owner: Types.ObjectId,
  likes: Types.ObjectId[],
  createdAt?: Date,
}

const cardSchema = new mongoose.Schema<CardSchema>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: 'Not valid link url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<CardSchema>('card', cardSchema)
