'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userList = [
      {
        email: 'johndoe@email.com',
        password: 'qwerty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'janedoe@email.com',
        password: 'asdfg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const [ userOne, userTwo ] = await queryInterface.bulkInsert('users', userList, { returning: true });

    // must stringify js object to insert as json else error
    const gameList = [
      {
        game_state: JSON.stringify({
          test: true,
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const [ game ] = await queryInterface.bulkInsert('games', gameList, { returning: true });

    const gameUsersData = [
      {
        game_id: game.id,
        player_one_id: userOne.id,
        player_two_id: userTwo.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('games_users', gameUsersData);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.bulkDelete('games_users', null, {}),
    ]);
    await Promise.all([
      queryInterface.bulkDelete('users', null, {}),
      queryInterface.bulkDelete('games', null, {}),
    ]);
  },
};
