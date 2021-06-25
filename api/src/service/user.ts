import { UserBl } from '@ecommerce/business_logic'
import { Request } from 'express';
import { apiUtils } from '@ecommerce/utils';
import { Catch } from '../decorator/catchDecorator'
import { requestErrorHandler } from '../handler/errorHandler'
import IGetAllUserResponseModel from '../model/responses/IGetAllUser';

export default class UserService {
    userBl!: UserBl

    @Catch(requestErrorHandler)
    async getAllUser(_: Request) {
      this.userBl = new UserBl().useBdConex().useUserRepository()
      const users = await this.userBl.getAllUsers()
      const response: Array<IGetAllUserResponseModel> = users.map((item) => ({
        id: item.id,
        email: item.email,
        emailVerified: item.emailverified,
        password: item.password,
        country: item.country,
        firstName: item.firstname,
        secondName: item.secondname,
        firstSurName: item.firstsurname,
        secondSurName: item.secondsurname,
        prefixNumber: item.prefixnumber,
        phoneNumber: item.phonenumber,
        phoneNumberVerified: item.phonenumberverified,
        active: item.active,
        urlProfilePhoto: item.urlprofilephoto,
        loginAttempt: item.loginattempt,
        isBusiness: item.isbusiness,
        createDate: item.createdate,
        modifyBy: item.modifyby,
        lastUpdateDate: item.lastupdatedate,
      }))
      return apiUtils.successfulResponse('OK', response)
    }
}
