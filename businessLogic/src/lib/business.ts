import { EcommerceBd } from '@ecommerce/access_data';
import { Knex } from 'knex';
import { BusinessRepository } from '@ecommerce/repository';
import { ApiError, countryUtil, statusErrors } from '@ecommerce/utils';
import moment from 'moment';
import uuidAPIKey from 'uuid-apikey';
import UserBl from './user';
import IAffiliateBusiness from '../model/IAffiliateBusiness';

export default class BusinessBl {
    instance!: Knex

    businessRepository!: BusinessRepository

    useBdConex(instance?: Knex) {
      if (instance) this.instance = instance
      else this.instance = EcommerceBd.initInstance().instance
      return this
    }

    useBusinessRepository(businessRepository?: BusinessRepository) {
      if (businessRepository) this.businessRepository = businessRepository
      else this.businessRepository = new BusinessRepository(this.instance)
      return this
    }

    async affiliateBusiness(data: IAffiliateBusiness) {
      const userBl = new UserBl().useBdConex().useUserRepository()
      const userData = await userBl.userRepository.getById(data.idUser)
      let businessData = await this.businessRepository.getByUserId(data.idUser)
      if (!userData || !userData.isbusiness) {
        throw new ApiError(
          'user not found',
          statusErrors.USER_NOT_FOUND,
          'BAD_REQUEST',
        )
      }

      if (businessData) {
        throw new ApiError(
          `already exists a business for the user ${data.idUser}`,
          statusErrors.ALREADY_EXISTS_BUSINESS_FOR_USER,
          'BAD_REQUEST',
        )
      }

      if (data.typePerson === 'natural') {
        const businessInfo = await this.businessRepository
          .getByKeyLegalRepresentative(data.keyLegalRepresentative)
        if (businessInfo) {
          throw new ApiError(
            `already exists a business with legal representative key ${data.keyLegalRepresentative}`,
            statusErrors.ALREADY_EXISTS_BUSINESS_WITH_LEGAL_KEY,
            'BAD_REQUEST',
          )
        }
      }

      if (data.typePerson === 'legal') {
        const businessInfo = await this.businessRepository.getByKeyBusiness(data.keyBusiness)
        if (businessInfo) {
          throw new ApiError(
            `already exists a business with key ${data.keyBusiness}`,
            statusErrors.ALREADY_EXISTS_BUSINESS_WITH_LEGAL_KEY,
            'BAD_REQUEST',
          )
        }
      }

      const { apiKey } = uuidAPIKey.create({ noDashes: true })
      await this.businessRepository.insert({
        id: 0,
        keylegalrepresentative: data.keyLegalRepresentative,
        firstnamelegalrepresentative: data.firstNameLegalRepresentative,
        secondnamelegalrepresentative: data.secondNameLegalRepresentative,
        firstsurnamelegalrepresentative: data.firstSurNameLegalRepresentative,
        secondsurnamelegalrepresentative: data.secondSurNameLegalRepresentative,
        keybusiness: data.keyBusiness,
        businessname: data.businessName,
        businessfantasyname: data.businessFantasyName,
        apikey: apiKey,
        country: data.country || countryUtil.countryCode.NI,
        department: data.department,
        municipality: data.municipality,
        description: data.description,
        iduser: data.idUser,
        active: true,
        createdate: moment().utc().toDate(),
        lastupdatedate: undefined,
        modifyby: undefined,
      })
      businessData = await this.businessRepository.getByUserId(data.idUser)
      return businessData
    }
}
