const Sequelize = require('sequelize')
let DB = 'study'

const sequelize = new Sequelize(DB, 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: DB,

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

module.exports = sequelize
