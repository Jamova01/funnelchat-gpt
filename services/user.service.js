const { models, } = require("../libs/sequelize");
const boom = require("@hapi/boom")

class UsersService {
  constructor() { }

  async find() {
    const users = models.User.findAll({
      include: ["assistants"]
    })

    return users
  }

  async findOne(id) {
    const user = await models.User.findByPk(id)
    // const user = await models.User.findByPk(id, {
    //   include: ["assistants"]
    // })
    if (!user) {
      throw boom.notFound("user not found")
    }
    return user
  }

  async create(data) {
    const newUser = models.User.create(data);
    return newUser
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const res = await user.update(changes)

    return res
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()

    return { id }
  }
}

module.exports = UsersService;
