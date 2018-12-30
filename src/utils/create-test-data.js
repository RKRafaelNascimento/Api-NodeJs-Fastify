const { User } = require('../models/index')
const sqlize = require('../services/sequelize')

async function setup () {
  await User.drop({ cascade: true })
  await sqlize.sync()
  await User.create({
    username: 'useradm',
    password: '1234',
    email: 'user@test.com.br'
  })
}
setup()
