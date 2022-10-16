const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uuid4 = require("uuid4")
const {
  Brand,
  Drink,
  Order,
  User,
  Order_Phone,
  Phone,
  Basket_Phone,
} = require("../../models/models")
const { Op } = require("sequelize")

class OrdersController {
  async add(req, res, next) {
    try {
      const userId = req.user.id
      const { sum, drinks, date } = req.body
      console.log(drinks)
      if (!date || !sum || !drinks) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const order = await Order.create({ userId, sum, date })

        for await (const d of drinks) {
          const candidate = await Phone.findOne({
            where: { amount: { [Op.lt]: 0 } },
          })
          if (!candidate) {
            const addedDrink = await Order_Phone.create({
              orderId: order.id,
              phoneId: d.drinkId,
              amount: d.amount,
            })
            const deletedItem = await Basket_Phone.destroy({
              where: { userId, phoneId: d.drinkId },
            })
          }
        }
        res.json({ message: "Вы успешно сделали заказ" })
      }
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при создании заказа" })
    }
  }

  async getAll(req, res, next) {
    try {
      const userId = req.user.id
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: Phone,
            attributes: ["id", "name", "price"],
            through: { attributes: ["amount"] },
          },
        ],
        order: [["id", "desc"]],
        attributes: { exclude: ["userId", "order_phone"] },
      })
      res.json({ orders })
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при получении заказов" })
    }
  }
}

module.exports = new OrdersController()
