export default interface IUserModel {
    id: number,
    email: string,
    emailverified: boolean,
    password: string,
    country: string,
    firstname: string,
    secondname: string,
    firstsurname: string,
    secondsurname: string,
    prefixnumber: string,
    phonenumber: string,
    phonenumberverified: boolean,
    active: boolean,
    urlprofilephoto: string,
    loginattempt: number,
    isbusiness: boolean,
    createdate: Date,
    modifyby: number | undefined,
    lastupdatedate: Date | undefined
}
