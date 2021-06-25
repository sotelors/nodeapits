import * as Knex from 'knex'

export default class EcommerceBd {
    public static instance: Knex.Knex

    public static initInstance() {
      if (!this.instance) {
        this.instance = Knex.knex({
          client: 'pg',
          connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'sotelo.admin',
            database: 'ecommerce',
          },
          pool: { min: 1, max: 100 },
          acquireConnectionTimeout: 10000,
        })
      }
      return this
    }
}
