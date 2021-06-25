import { ApiError, statusErrors } from '@ecommerce/utils';
import { Knex } from 'knex';
import IBusinessModel from './tableModel/business';
import { tables } from './tables';

export default class BusinessRepository {
    private instance: Knex

    constructor(instance: Knex) {
      this.instance = instance
    }

    getByUserId(idUser: number) {
      return this.instance(tables.BUSINESS)
        .where('iduser', idUser)
        .then((r) => <IBusinessModel>r[0])
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    getByKeyLegalRepresentative(key: string) {
      return this.instance(tables.BUSINESS)
        .where('keylegalrepresentative', key)
        .then((r) => <IBusinessModel>r[0])
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    getByKeyBusiness(key: string) {
      return this.instance(tables.BUSINESS)
        .where('keybusiness', key)
        .then((r) => <IBusinessModel>r[0])
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    insert(data: IBusinessModel) {
      const { id, ...otherData } = data
      return this.instance(tables.BUSINESS)
        .insert(otherData)
        .then(() => true)
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }
}
