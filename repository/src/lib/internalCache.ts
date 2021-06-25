import { ApiError, statusErrors } from '@ecommerce/utils'
import { Knex } from 'knex'
import moment from 'moment'
import IInternalCache from './tableModel/internalCache'
import { tables } from './tables'

export default class InternalCache {
    private instance: Knex

    constructor(instance: Knex) {
      this.instance = instance
    }

    getByKey(key: string) {
      return this.instance(tables.INTERNAL_CACHE)
        .where('key', key)
        .andWhereRaw(`exp > ${moment().utc().valueOf()}`)
        .then((r) => <IInternalCache>r[0])
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    insert(data: IInternalCache) {
      const { id, ...otherData } = data
      return this.instance(tables.INTERNAL_CACHE)
        .insert(otherData)
        .then(() => true)
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }

    update(data: IInternalCache) {
      const { id, ...otherData } = data
      return this.instance(tables.INTERNAL_CACHE)
        .update(otherData)
        .where('id', id)
        .then(() => true)
        .catch((err) => {
          throw new ApiError(err.message, statusErrors.BD_ERROR, 'BAD_REQUEST')
        })
    }
}
