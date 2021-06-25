import { ApiError, countryUtil, statusErrors } from '@ecommerce/utils';

export default interface ISignUpRequestModel {
    email: string;
    password: string;
    country?: keyof typeof countryUtil.countryCode;
    prefixNumber: string;
    phoneNumber: string;
    isBusiness: boolean;
    aditionalData?: {
        firstname?: string;
        secondname?: string;
        firstsurname?: string;
        secondsurname?: string;
        phonenumberverified?: boolean;
        urlprofilephoto?: string;
        emailverified?: boolean;
    };
}

export const validateSignUpRequestModel = (req: ISignUpRequestModel) => {
  if (!req.email) {
    throw new ApiError(
      'field email is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }

  if (!req.password) {
    throw new ApiError(
      'field password is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }

  if (!req.prefixNumber) {
    throw new ApiError(
      'field prefixNumber is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }

  if (!req.phoneNumber) {
    throw new ApiError(
      'field phoneNumber is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }

  if (req.isBusiness === undefined) {
    throw new ApiError(
      'field isBusiness is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
}
