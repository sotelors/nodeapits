import * as httpCodes from '../constants/http-codes'

export default class ApiError {
  message: string

  status?: number

  httpCode?: httpCodes.ErrorCode

  constructor(
    message: string,
    status?: number,
    httpCode?: httpCodes.ErrorCode,
  ) {
    this.message = message
    this.status = status
    this.httpCode = httpCode
  }
}
