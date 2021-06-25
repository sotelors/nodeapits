/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
export type HandlerFunction = (error: any, ctx: any, args: any) => void

export const handleError = (
  ctx: any,
  handler: HandlerFunction,
  error: any,
  args: any,
) => handler.call(undefined, error, ctx, args)
// tslint:disable-next-line
export const Catch = (handler: HandlerFunction): any => (
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  // save a reference to the original method
  const originalMethod = descriptor.value
  // rewrite original method with custom wrapper
  descriptor.value = function (...args: Array<any>): any {
    try {
      const result = originalMethod.apply(this, args)
      // check if method is asynchronous
      if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
        // return promise
        return result.catch((error: any) => handleError(this, handler, error, args))
      }
      // return actual result
      return result
    } catch (error) {
      return handleError(this, handler, error, args)
    }
  }
  return descriptor
}
