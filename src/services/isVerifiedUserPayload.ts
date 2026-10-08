import { JwtPayload } from 'jsonwebtoken'

type JwtUserPayload = JwtPayload & { _id: string }

export const isVerifiedUserPayload = (payload: JwtPayload): payload is JwtUserPayload => (
  !!payload && typeof payload === 'object' && '_id' in payload && typeof payload._id === 'string'
)
