import jwt from 'jsonwebtoken'
import { COOKIE_MAX_AGE } from '../../constants'

export const getJwtToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('No JWT_SECRET')
  }

  return jwt.sign(
    { id },
    jwtSecret,
    { expiresIn: COOKIE_MAX_AGE / 1000 },
  )
}
