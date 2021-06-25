import { statusErrors, ApiError } from '@ecommerce/utils'

export default interface ITestWithBodyRequestModel {
    name: string
    description: string
}

export const validateTestWithBodyRequestModel = (req: ITestWithBodyRequestModel) => {
  if (!req.name) {
    throw new ApiError('name is required', statusErrors.PROPERTY_REQUIRED, 'PRECONDITION_FAILED')
  }
}
