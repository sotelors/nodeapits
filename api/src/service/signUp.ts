import { BusinessBl, UserBl } from '@ecommerce/business_logic'
import { apiUtils, Authentication } from '@ecommerce/utils'
import { Request } from 'express';
import { Catch } from '../decorator/catchDecorator'
import { requestErrorHandler } from '../handler/errorHandler'
import ISignUpRequestModel, { validateSignUpRequestModel } from '../model/request/ISignUp'
import ISignUpResponseModel from '../model/responses/ISignUp'
import IAffiliateBusiness, { validateAffiliateBusinessRequestModel } from '../model/request/IAffiliateBusiness'
import IAffiliateBusinessResponseModel from '../model/responses/IAffiliateBusiness'

export default class SignUpService {
    userBl!: UserBl

    businessBl!: BusinessBl

    @Catch(requestErrorHandler)
    async register(req: Request) {
      const body = <ISignUpRequestModel>apiUtils.getBody(req)
      validateSignUpRequestModel(body)
      this.userBl = new UserBl().useBdConex().useUserRepository()
      const user = await this.userBl.register({
        email: body.email,
        password: body.password,
        country: body.country,
        prefixNumber: body.prefixNumber,
        phoneNumber: body.phoneNumber,
        isBusiness: body.isBusiness,
        aditionalData: body.aditionalData,
      })
      const response: ISignUpResponseModel = {
        id: user.id,
        email: user.email,
        emailVerified: user.emailverified,
        password: user.password,
        country: user.country,
        firstName: user.firstname,
        secondName: user.secondname,
        firstSurName: user.firstname,
        secondSurName: user.secondsurname,
        prefixNumber: user.prefixnumber,
        phoneNumber: user.phonenumber,
        phoneNumberVerified: user.phonenumberverified,
        urlProfilePhoto: user.urlprofilephoto,
        loginAttempt: user.loginattempt,
        isBusiness: user.isbusiness,
        active: user.active,
      }
      return apiUtils.successfulResponse('OK', response)
    }

    @Catch(requestErrorHandler)
    async affiliateBusiness(req: Request) {
      await new Authentication()
        .validateToken(
          req.headers.auth
            ? req.headers.auth.toString()
            : '',
        )
      const body = <IAffiliateBusiness>apiUtils.getBody(req)
      validateAffiliateBusinessRequestModel(body)
      this.businessBl = new BusinessBl().useBdConex().useBusinessRepository()
      const result = await this.businessBl.affiliateBusiness({
        keyLegalRepresentative: body.keyLegalRepresentative,
        firstNameLegalRepresentative: body.firstNameLegalRepresentative,
        secondNameLegalRepresentative: body.secondNameLegalRepresentative,
        firstSurNameLegalRepresentative: body.firstSurNameLegalRepresentative,
        secondSurNameLegalRepresentative: body.secondSurNameLegalRepresentative,
        keyBusiness: body.keyBusiness || '',
        businessName: body.businessName,
        businessFantasyName: body.businessFantasyName,
        country: body.country,
        department: body.department,
        municipality: body.municipality,
        description: body.description || '',
        idUser: body.idUser,
        typePerson: body.typePerson,
      })
      const response: IAffiliateBusinessResponseModel = {
        id: result.id,
      }
      return apiUtils.successfulResponse('OK', response)
    }
}
