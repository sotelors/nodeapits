import { EcommerceBd } from '@ecommerce/access_data'
import { UserRepository } from '@ecommerce/repository'
import { countryUtil, ApiError, statusErrors } from '@ecommerce/utils'
import { Knex } from 'knex'
import moment from 'moment'
import ISignUp from '../model/ISignUp'

export default class UserBl {
    instance!: Knex

    userRepository!: UserRepository

    useBdConex(instance?: Knex) {
      if (instance) this.instance = instance
      else this.instance = EcommerceBd.initInstance().instance
      return this
    }

    useUserRepository(userRepository?: UserRepository) {
      if (userRepository) this.userRepository = userRepository
      else this.userRepository = new UserRepository(this.instance)
      return this
    }

    getAllUsers() {
      return this.userRepository.get()
    }

    async register(data: ISignUp) {
      const { aditionalData } = data
      let user = await this.userRepository.getByEmail(data.email)
      if (user) {
        throw new ApiError(
          `already exist a user with email ${data.email}`,
          statusErrors.USER_ALREADY_EXISTS,
          'BAD_REQUEST',
        )
      }
      await this.userRepository.insert({
        id: 0,
        email: data.email,
        password: data.password,
        country: data.country || countryUtil.countryCode.NI,
        prefixnumber: data.prefixNumber,
        phonenumber: data.phoneNumber,
        isbusiness: data.isBusiness,
        firstname: aditionalData?.firstname || '',
        secondname: aditionalData?.secondname || '',
        firstsurname: aditionalData?.firstsurname || '',
        secondsurname: aditionalData?.secondsurname || '',
        phonenumberverified: aditionalData?.phonenumberverified || false,
        urlprofilephoto: aditionalData?.urlprofilephoto || '',
        loginattempt: 0,
        createdate: moment().utc().toDate(),
        emailverified: aditionalData?.emailverified || false,
        active: true,
        lastupdatedate: undefined,
        modifyby: undefined,
      })
      user = await this.userRepository.getByEmail(data.email)
      return user
    }
}
