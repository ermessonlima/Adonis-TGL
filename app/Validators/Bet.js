'use strict'

class Bet {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      '*.*.color': 'required',
      '*.*.game_id': 'required',
      '*.*.numbers': 'required'
    }
  }
}

module.exports = Bet
