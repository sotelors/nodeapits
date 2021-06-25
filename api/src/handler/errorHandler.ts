import { statusErrors, apiUtils } from '@ecommerce/utils'
import { HandlerFunction } from '../decorator/catchDecorator';

export const requestErrorHandler: HandlerFunction = (error: any, _ctx: any, args: any) => apiUtils.errorResponse(error.httpCode || 'BAD_REQUEST', {
  status: error.status !== undefined ? error.status : statusErrors.UNKNOWN,
  message: error.message,
})
