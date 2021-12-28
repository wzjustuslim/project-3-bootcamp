import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';
import initGamesController from './controllers/games.mjs';

export default function bindRoutes(app) {
  const UsersController = initUsersController(db);
  const GamesController = initGamesController(db);

  // render a list of users
  app.get('/users/', UsersController.index);
  // render a form to create a user
  app.get('/users/create', UsersController.createForm);
  // accept a request to create a user
  app.post('/users/create', UsersController.create);
  // render a single user
  app.get('/users/:id', UsersController.show);
  // render a form to edit a user
  app.get('/users/:id/edit', UsersController.edit);
  // accept a request to update a user
  app.put('/users/:id', UsersController.update);
  // accept a request to delete a user
  app.delete('/users/:id', UsersController.destroy);

  // render a list of games / mainpage
  app.get('/games/', GamesController.index);
  // render a form to create a game
  app.get('/games/create', GamesController.createForm);
  // accept a request to create a game
  app.post('/games/create', GamesController.create);
  // render a single game
  app.get('/games/:id', GamesController.show);
  // render a form to edit a game
  app.get('/games/:id/edit', GamesController.edit);
  // accept a request to update a game
  app.put('/games/:id', GamesController.update);
  // accept a request to delete a game
  app.delete('/games/:id', GamesController.destroy);
}
