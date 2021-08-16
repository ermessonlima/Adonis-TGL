"use strict";

class UserEdit {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required",
    };
  }
}

module.exports = UserEdit;
