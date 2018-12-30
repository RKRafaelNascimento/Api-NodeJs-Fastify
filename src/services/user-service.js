const { User } = require('../models/index')

class UserService {
  static async findUser () {
    try {
      let result = await User.findAll()
      return result
    } catch (e) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }

  static async createUser (username, password, email) {
    try {
      let result = await User.create({ username, password, email })
      result.password = '******'
      return result
    } catch (e) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
}

module.exports = UserService
