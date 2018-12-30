const { User } = require('../models/index')

async function drop () {
  await User.drop()
}

drop()
