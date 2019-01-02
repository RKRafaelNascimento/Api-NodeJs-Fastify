const { User } = require('../models/index')

class UserService {
  static async findUser () {
    try {
      let result = await User.findAll({})
      return result
    } catch (err) {
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
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }

  static async update (username, password, email) {
    try {
      let result = await User.update(
        { username, password, email },
        { where: { email: email } }
      )
      result.password = '*******'
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }

  static async delete (id) {
    try {
      console.log(`${id}`)
      let result = await User.destroy({ where: { id: id } })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }

  static async auth (email, password) {
    try {
      const user = await User.findOne({
        where: {
          email,
          password: password
        }
      })

      if (user == null) {
        return `Usuario ou senha invalido`
      }

      let result = {
        token: '',
        data: {
          id: user.id,
          email: user.email,
          name: user.username
        }
      }

      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
}

module.exports = UserService
