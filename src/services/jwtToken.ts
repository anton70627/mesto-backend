import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN } from '../constants'

export const getJwtToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('No JWT_SECRET')
  }

  return jwt.sign(
    { _id: id },
    jwtSecret,
    { expiresIn: JWT_EXPIRES_IN },
  )
}
