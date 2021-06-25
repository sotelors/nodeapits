import { countryUtil } from '@ecommerce/utils';

export default interface ISignUp {
    email: string,
    password: string,
    country: keyof typeof countryUtil.countryCode | undefined,
    prefixNumber: string,
    phoneNumber: string,
    isBusiness: boolean,
    aditionalData: {
        firstname?: string,
        secondname?: string,
        firstsurname?: string,
        secondsurname?: string,
        phonenumberverified?: boolean,
        urlprofilephoto?: string,
        emailverified?: boolean,
    } | undefined
}
