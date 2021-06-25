import jwToken from 'jsonwebtoken'
import { statusErrors } from '../constants/status_errors'
import ApiError from './errors'

export default class Authentication {
    // luego pasaremos esto a variables de ambiente
    private secret = 'dbf9598c3731501bd980cbd4dbab9011dbc42f2b1e96d2b5a712823ffde914df'

    signUp(payload: string) {
      return jwToken.sign(JSON.parse(payload), this.secret, { expiresIn: '1h' })
    }

    async validateToken(authToken: string) {
      const token = authToken && authToken.split(' ')[1]
      if (!token) {
        throw new ApiError(
          'token is required',
          statusErrors.TOKEN_NOT_FOUND,
          'BAD_REQUEST',
        )
      }
      await new Promise((resolve, reject) => jwToken.verify(token, this.secret, (err) => {
        if (err) reject(err)
        resolve(true)
      })).catch((err) => {
        throw new ApiError(
          err.message,
          statusErrors.TOKEN_IS_INVALID,
          'BAD_REQUEST',
        )
      })
    }
}
