import { ApiError, statusErrors } from '@ecommerce/utils'

export default interface IVerifyOtpRequestModel {
    phoneNumber: string
    prefixPhone: string
    code: string
}

export const validateVerifyOtpRequestModel = (req: IVerifyOtpRequestModel) => {
  if (!req.phoneNumber) {
    throw new ApiError(
      'field phoneNumber is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }

  if (!req.prefixPhone) {
    throw new ApiError(
      'field prefixPhone is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }

  if (!req.code) {
    throw new ApiError(
      'field code is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
}
