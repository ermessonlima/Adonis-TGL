'use strict'

class Type {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      type: 'string|required|unique:types',
      description: 'string|required',
      range: 'number|required',
      price: 'number|required',
      max_number: 'number|required',
      color: 'string|required',
      min_cart_value: 'number|required'
    }
  }
}

module.exports = Type
