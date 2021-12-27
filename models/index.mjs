import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initGameModel from './game.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Game = initGameModel(sequelize, Sequelize.DataTypes);

db.User.belongsToMany(db.Game, { through: 'games_users' });
db.Game.belongsToMany(db.User, { through: 'games_users' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
