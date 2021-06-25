import { countryUtil } from '@ecommerce/utils';

export default interface IAffiliateBusiness {
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
    typePerson: 'natural' | 'legal'
}
