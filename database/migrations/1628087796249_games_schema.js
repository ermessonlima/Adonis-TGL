'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GamesSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.integer('range').notNullable()
      table.float('price').notNullable()
      table.integer('max_number').notNullable()
      table.string('color').notNullable()
      table.float('min_cart_value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GamesSchema
