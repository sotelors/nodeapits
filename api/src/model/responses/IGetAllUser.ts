export default interface IGetAllUserResponseModel {
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
    active: boolean,
    urlProfilePhoto: string,
    loginAttempt: number,
    isBusiness: boolean,
    createDate: Date,
    modifyBy: number | undefined,
    lastUpdateDate: Date | undefined
}
