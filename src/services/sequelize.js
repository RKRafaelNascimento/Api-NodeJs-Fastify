const Sequelize = require('sequelize')

const sequelize = new Sequelize('study', 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: 'study',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

module.exports = sequelize
