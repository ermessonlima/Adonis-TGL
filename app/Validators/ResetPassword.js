'use strict'

class ResetPassword {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      token: 'required',
      password: 'required'
    }
  }
}

module.exports = ResetPassword
