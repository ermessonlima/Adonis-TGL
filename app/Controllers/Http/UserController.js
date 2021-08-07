'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

class UserController {


    async index({ request, response, view }) {
        const user = await User.all();

        return user;
    }


    async store({ request }) {
        const data = request.only(['username', 'email', 'password'])
        const user = await User.create(data)

        await Mail.send(
            ['emails.new_user'],
            {  username: user.username },
            message => {
                message
                    .to(user.email)
                    .from('ermessonlimadossantos@hotmail.com', 'Ermesson')
                    .subject('Recuperação de senha')
            }
        )
        return user
    }

    async show ({ params, request, response, view }) {
        const user = await User.findOrFail(params.id)
    
        return user
      }


    async update({ params, request, response, auth }) {
        const data = request.only(["username", "email", "password"]);
        const user = auth.user;
        
        console.log(data.username)
        if (data.username) {
            user.username = data.username;
        }
        console.log(data.email)
        if (data.email) {
            user.email = data.email;
        }
        console.log(data.password)
        if (data.password) {
            user.password = data.password;
        }
        console.log('data.password')
        await user.save();
        console.log('user')
        return user;
    }


    async destroy ({ params, response }) {
        try {
            const user = await User.findOrFail(params.id)

            await user.delete()
        } catch (err) {
          return response.status(err.status).send({ err: { message: err.message } })
        }
      }

}

module.exports = UserController
