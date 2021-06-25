import { ApiError, countryUtil, statusErrors } from '@ecommerce/utils';

enum personType {
  natural = 'natural',
  legal = 'legal',
}

export default interface IAffiliateBusinessRequestModel {
    keyLegalRepresentative: string
    firstNameLegalRepresentative: string
    secondNameLegalRepresentative: string
    firstSurNameLegalRepresentative: string
    secondSurNameLegalRepresentative: string
    keyBusiness: string
    businessName: string
    businessFantasyName: string
    country: keyof typeof countryUtil.countryCode | undefined,
    department: number
    municipality: number
    description: string
    idUser: number
    typePerson: keyof typeof personType
}

export const validateAffiliateBusinessRequestModel = (req: IAffiliateBusinessRequestModel) => {
  if (!req.keyLegalRepresentative) {
    throw new ApiError(
      'field keyLegalRepresentative is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.firstNameLegalRepresentative) {
    throw new ApiError(
      'field firstNameLegalRepresentative is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.secondNameLegalRepresentative) {
    throw new ApiError(
      'field secondNameLegalRepresentative is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.firstSurNameLegalRepresentative) {
    throw new ApiError(
      'field firstSurNameLegalRepresentative is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.secondSurNameLegalRepresentative) {
    throw new ApiError(
      'field secondSurNameLegalRepresentative is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.typePerson || !personType[req.typePerson]) {
    throw new ApiError(
      'field typePerson is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.keyBusiness && req.typePerson === 'legal') {
    throw new ApiError(
      'field keyBusiness is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.businessName) {
    throw new ApiError(
      'field businessName is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.businessFantasyName) {
    throw new ApiError(
      'field businessFantasyName is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.department) {
    throw new ApiError(
      'field department is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.municipality) {
    throw new ApiError(
      'field municipality is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
  if (!req.idUser) {
    throw new ApiError(
      'field idUser is required',
      statusErrors.PROPERTY_REQUIRED,
      'PRECONDITION_FAILED',
    )
  }
}
