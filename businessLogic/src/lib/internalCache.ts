import { Knex } from 'knex';
import { InternalCacheRepository } from '@ecommerce/repository'
import { EcommerceBd } from '@ecommerce/access_data';
import moment from 'moment';
import ISetInternalCacheKey from '../model/ISetInternalCacheKey';

export default class InternalCacheBl {
    private instance!: Knex

    private internalCacheRepository!: InternalCacheRepository

    constructor() {
      this.instance = EcommerceBd.initInstance().instance
      this.internalCacheRepository = new InternalCacheRepository(this.instance)
    }

    async getKey(key: string) {
      const item = await this.internalCacheRepository.getByKey(key)
      return item ? item.value : undefined
    }

    async setKey(data: ISetInternalCacheKey) {
      const key = await this.internalCacheRepository.getByKey(data.key)
      if (!key) {
        const timeExp = moment().utc().add(data.exp, 'seconds').valueOf()
        return this.internalCacheRepository.insert({
          id: 0,
          key: data.key,
          value: data.value,
          exp: timeExp,
        })
      }
      return this.internalCacheRepository.update({
        id: key.id,
        key: key.key,
        value: key.value,
        exp: key.exp,
      })
    }

    async expireKey(key: string) {
      const item = await this.internalCacheRepository.getByKey(key)
      if (item) {
        const currenDate = moment().utc()
        const endDate = moment.unix(item.exp).utc()
        const duration = moment.duration(endDate.diff(currenDate)).asSeconds();
        const timeExp = endDate.subtract(duration, 'seconds').valueOf()
        this.internalCacheRepository.update({
          id: item.id,
          key: item.key,
          value: item.value,
          exp: timeExp,
        })
      }
    }
}
