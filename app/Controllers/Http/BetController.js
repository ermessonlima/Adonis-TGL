'use strict'

const Bet = use("App/Models/Bet");
const Mail = use("Mail");
const Games = use("App/Models/Game");

class BetController {

  async index({ auth }) {

    const user_id = auth.user.id;
    const bets = await Bet.query()
      .where({ user_id })
      .with('types', builder => {
        builder.select('id', 'type', 'color')
      })
      .fetch();
    return bets
  }

  async store({ request, response, auth }) {
    console.log(auth.user.email)
    const data = request.all()
    const bets = (Object.values(data))

    var valueCart = await Games.query()
      .select('min_cart_value')
      .where('id', bets[0].game_id)
      .firstOrFail()

    try {
      var total = 0;

      for (let index = 0; index < bets.length; index++) {

        const bet = bets[index];

        const type = await Games.query()
          .select('price')
          .where('id', bet.game_id)
          .firstOrFail()

          var lengthCart = await Games.query()
          .select('max_number')
          .where('id', bet.game_id)
          .firstOrFail()


          var range = await Games.query()
          .select('range')
          .where('id', bet.game_id)
          .firstOrFail()

          console.log(range)

          console.log(range.range)
        bet.price = type.price

        function isBigEnough(element) {
          return element <= range.range && element >= 1;
        }

        function hasDuplicates(array) {
          return (new Set(array)).size == array.length;
        }

        let formErros = false;
        console.log(bet)
        console.log("b" + bet.numbers.split(',').length != lengthCart.max_number)

        if (bet.numbers.split(',').length != lengthCart.max_number) {
          formErros = true;
          return response.status(400).json(
            { error: {
              menssage: `You are betting to have numbers above what is allowed.`,
            }}
          )
        }
  
        console.log("a" + !bet.numbers.split(',').every(isBigEnough))
        if (!bet.numbers.split(',').every(isBigEnough)) {
          formErros = true;
          return response.status(400).json(
            { error: {
              menssage: `Number out of range 1 to ${range.range}.`,
            }}
          )
        }

        console.log(!hasDuplicates(bet.numbers.split(',')))
        if (!hasDuplicates(bet.numbers.split(','))) {
          formErros = true;
          return response.status(400).json(
            { error: {
              menssage: `Duplicate numbers`,
            }}
          )
        }

        if (formErros) {
          return;
        } else {
          total += bet.price

        }
      }

      if (valueCart.min_cart_value < total) {

        for (let index = 0; index < bets.length; index++) {

          const bet = bets[index];

          const type = await Games.query()
            .select('price')
            .where('id', bet.game_id)
            .firstOrFail()

          bet.user_id = auth.user.id
          bet.price = type.price

          await Bet.create(bet)
        }

        await Mail.send(
          ['emails.new_bet'],
          { total },
          message => {
              message
                  .to(auth.user.email)
                  .from('ermessonlimadossantos@hotmail.com', 'Ermesson')
                  .subject('Nova Aposta!')
          }
      )
        return response.status(200).send({ message: 'Cadastrado com Sucesso!' })

      } else {
        return response.status(400).json({
          error: {
            menssage: `minimum value is ${valueCart.min_cart_value} its value is ${total}.`,
          },
        })

      }

    } catch (err) {
      console.log(err)
      return response
        .status(err.status)
        .send(err);
    }
  }

  async show({ params, request, response, view }) {
    const bet = await Bet.findOrFail(params.id)
    return bet
  }

  async update({ params, request, response }) {

    const data = request.all()
    const bet = await Bet.findOrFail(params.id)
    const type = await Games.findOrFail(data.game_id)

    data.price = type.price

    await bet.merge(data)
    await bet.save()
    return bet
  }

  async destroy({ params, request, response }) {
    const bet = await Bet.findOrFail(params.id)
    await bet.delete()
  }
}

module.exports = BetController
