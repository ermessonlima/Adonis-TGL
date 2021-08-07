'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bet extends Model {

  types() {
    return this.belongsTo('App/Models/Game')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Bet
