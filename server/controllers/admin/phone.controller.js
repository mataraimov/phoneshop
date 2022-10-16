const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Brand, History, Phone } = require("../../models/models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

class TypeController {
  async add(req, res, next) {
    try {
      const { name, brandId, logo, price, amount } = req.body
      if (!name || !brandId || !logo || !price || !amount) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const phone = await Phone.create({
          name,
          brandId,
          logo,
          price,
          amount,
        })
        res.json({ message: "Вы успешно создали телефон" })
      }
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при добавлении телефон" })
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params
      const phone = await Phone.findOne({
        include: [{ model: Brand, attributes: ["name"] }],
        where: { id },
      })
      return res.json(phone)
    } catch (error) {
      res.status(505).json({ message: "Ошибка при получении телефона" })
    }
  }
  async getFilteredDrinks(req, res, next) {
    try {
      const { page = 1, limit = 1, phoneName = "", brand = "" } = req.query

      let offset = 0 + (page - 1) * limit
      const phones = await Phone.findAll({
        include: [{ model: Brand, attributes: ["name"] }],
        where: { name: { [Op.iLike]: `%${phoneName}%` } },
        limit: limit,
        offset: offset,
        order: [["id", "desc"]],
      })
      const total = await Phone.count({
        include: [
          {
            model: Brand,
            where: { name: { [Op.like]: `%${brand}%` } },
          },
        ],
        where: { name: { [Op.like]: `%${phoneName}%` } },
        limit: limit,
        offset: offset,
      })
      return res.json({ phones, total })
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при получении телефонов" })
    }
  }
  async receiptPhone(req, res, next) {
    try {
      const { drinkId, amount, isComing, date, sum } = req.body
      if (!drinkId || !amount || !isComing || !date) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const candidateAmount = await Phone.findOne({
          where: { id: drinkId },
        })
        await Phone.update(
          { amount: candidateAmount.amount + amount },
          { where: { id: drinkId } }
        )
        const history = await History.create({
          phoneId: drinkId,
          amount,
          status: isComing,
          date,
          sum,
        })
        res.json({ message: "Вы успешно добавили количество товара", history })
      }
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при добавлении количества" })
    }
  }
}

module.exports = new TypeController()
