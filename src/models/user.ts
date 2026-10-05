import mongoose from 'mongoose'

type UserSchema = {
  name: string,
  about: string,
  avatar: string,
}

const userSchema = new mongoose.Schema<UserSchema>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
})

export default mongoose.model<UserSchema>('user', userSchema)
