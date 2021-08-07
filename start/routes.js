'use strict'

const Route = use('Route')

//Users
Route.get("users", "UserController.index");
Route.post('users', 'UserController.store').validator("User");

//Session
Route.post('sessions', 'SessionController.store')

//Password
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

//Games
Route.resource("games", "GameController").apiOnly().validator(
    new Map([
      [["games.store"], ["Game"]],
      [["games.update"], ["Game"]],
    ])
  );

Route.group(() => {
//Users
Route.put("users", "UserController.update").validator("UserEdit");

Route.get('users/:id', 'UserController.show')
Route.delete('users/:id', 'UserController.destroy')
  
//Bets
Route.resource("bets", "BetController").apiOnly().validator(
    new Map([
        [["bets.store"], ["Bet"]],
        [["bets.update"], ["Bet"]]
    ]));

}).middleware(["auth"]);
