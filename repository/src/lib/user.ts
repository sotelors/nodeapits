import { Knex } from 'knex'
import { ApiError, statusErrors } from '@ecommerce/utils'
import { tables } from './tables'
import IUserModel from './tableModel/user'

export default class UserRepository {
    private instance: Knex

    constructor(instance: Knex) {
      this.instance = instance
    }

    public async get() {
      return this.instance(tables.USERS)
        .then((r) => <Array<IUserModel>>r)
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    public async getByEmail(email: string) {
      return this.instance(tables.USERS)
        .where('email', email)
        .then((r) => <IUserModel>r[0])
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    public async getById(id: number) {
      return this.instance(tables.USERS)
        .where('id', id)
        .then((r) => <IUserModel>r[0])
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    public insert(data: IUserModel) {
      const { id, ...otherData } = data
      return this.instance(tables.USERS)
        .insert(otherData)
        .then(() => true)
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }
}
