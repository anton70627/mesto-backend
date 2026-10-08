import { JwtPayload } from 'jsonwebtoken'

type JwtUserPayload = JwtPayload & { id: string }

export const isVerifiedUserPayload = (payload: JwtPayload): payload is JwtUserPayload => (
  !!payload && typeof payload === 'object' && 'id' in payload && typeof payload.id === 'string'
)
