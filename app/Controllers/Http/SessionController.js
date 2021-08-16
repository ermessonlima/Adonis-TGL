'use strict'

const User = use('App/Models/User')

class SessionController {
    async store ({ request, response, auth  }) {
        const { email, password } = request.all();

        const user = await User.findBy("email", email);
    
        const token = await auth.attempt(email, password);
    
        return { user, token };
    }
}

module.exports = SessionController
