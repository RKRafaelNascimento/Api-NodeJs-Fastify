const sqlize = require('../services/sequelize')
const Sequelize = require('sequelize')

const User = sqlize.define('user', {
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  }
})

module.exports = User
