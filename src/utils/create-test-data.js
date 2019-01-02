const User = require('../models/user-model')
const sqlize = require('../services/sequelize')

async function setup () {
  await sqlize.sync()
  await User.drop({ cascade: true })
  await sqlize.sync()
  await User.create({
    username: 'useradm',
    password: '1234',
    email: 'user@test.com.br'
  })

  await User.create({
    username: 'usertest',
    password: '1234',
    email: 'test@test.com.br'
  })
  await User.create({
    username: 'userlol',
    password: '1234',
    email: 'lol@test.com.br'
  })
}
setup()
