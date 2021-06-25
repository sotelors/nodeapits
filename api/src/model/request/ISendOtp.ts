import { ApiError, statusErrors } from '@ecommerce/utils'

export default interface ISendOtpRequestModel {
    phoneNumber: string
    prefixPhone: string
}

export const validateSendOtpRequestModel = (req: ISendOtpRequestModel) => {
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
}
