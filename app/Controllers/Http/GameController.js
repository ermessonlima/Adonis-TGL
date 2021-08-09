'use strict'


const Games = use('App/Models/Game')

class GameController {

  async index ({ request, response, view }) {
    const games = await Games.all()

    return games
  }

  async store ({ request, response }) {
    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max_number',
      'color',
      'min_cart_value'
    ])

    const games = await Games.create(data)
    return games
  }

 
  async show ({ params, request, response, view }) {
    const games = await Games.findOrFail(params.id)

    return games
  }

  async update ({ params, request, response }) {
  
    const games = await Games.findOrFail(params.id)

    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max_number',
      'color',
      'min_cart_value'
    ])

    games.merge(data)

    await games.save()

    return games

  }

  async destroy ({ params, request, response }) {
    const games = await Games.findOrFail(params.id)

    await games.delete()
  }
}

module.exports = GameController
