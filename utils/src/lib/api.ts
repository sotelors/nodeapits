import { Request } from 'express'
import * as httpCodes from '../constants/http-codes'

export const successfulResponse = (
  successCode: httpCodes.SuccessCode,
  result: object | string | number | boolean | null,
) => ({
  statusCode: httpCodes.successCodes[successCode],
  body: JSON.stringify({ result }),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE',
  },
})

export const errorResponse = (
  errorCode: httpCodes.ErrorCode | number,
  { message, status }: { message: string; status?: number },
) => ({
  statusCode: httpCodes.errorCodes[errorCode as httpCodes.ErrorCode] || errorCode,
  body: JSON.stringify({ error: { message, status } }),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE',
  },
})

export const getBody = <T extends object>(event: Request): T => {
  try {
    if (!event.body) return {} as T
    return event.body
  } catch (err) {
    throw new Error('event body is not a valid JSON')
  }
}

export const getParams = <T extends object>(event: Request): T => (event.params || {}) as T

export const getQuery = <T extends object>(event: Request): T => (event.query || {}) as T
