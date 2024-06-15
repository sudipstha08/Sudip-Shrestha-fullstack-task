import jwt from 'jsonwebtoken'
import { config } from '../infrastructure'

export const generateToken = (id: string) => {
  const token = jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  })
  return token
}
