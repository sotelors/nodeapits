export default interface ISignUpResponseModel {
    id: number,
    email: string,
    emailVerified: boolean,
    password: string,
    country: string,
    firstName: string,
    secondName: string,
    firstSurName: string,
    secondSurName: string,
    prefixNumber: string,
    phoneNumber: string,
    phoneNumberVerified: boolean,
    urlProfilePhoto: string,
    loginAttempt: number,
    isBusiness: boolean,
    active: boolean
}
