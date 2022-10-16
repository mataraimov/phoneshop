const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uuid4 = require("uuid4")
const { Brand, Order, User, History, Phone } = require("../../models/models")
const { Op } = require("sequelize")

class OrdersController {
  async getAll(req, res, next) {
    try {
      const orders = await Order.findAll({
        include: [
          { model: User, attributes: ["email"] },
          {
            model: Phone,
            attributes: ["id", "name", "price"],
            through: { attributes: ["amount"] },
          },
        ],

        attributes: { exclude: ["userId", "order_phone"] },
        order: [["date", "DESC"]],
      })
      res.json({ orders })
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при получении заказов" })
    }
  }

  async executeOrder(req, res, next) {
    try {
      const { status, orderId, drinks } = req.body
      let statusStr
      switch (status) {
        case 0:
          statusStr = "Заказ успешно отменен"
          break
        case 2:
          statusStr = "Заказ успешно выполнен"
          break
        default:
          statusStr = "Заказ успешно отменен"
      }
      if (status == 0) {
        const order = await Order.update({ status }, { where: { id: orderId } })
        return res.json({ message: statusStr })
      } else {
        const order = await Order.update({ status }, { where: { id: orderId } })
        for await (const d of drinks) {
          const editedDrinkAmount = await Phone.findOne({
            where: { id: d.id },
            attributes: ["amount"],
          })
          if (d.order_phone.amount > editedDrinkAmount.amount) {
            return res.status(404).json({
              message: "В заказе есть товары с недостаточным количеством",
            })
          } else {
            const history = await History.create({
              phoneId: d.id,
              amount: d.order_phone.amount,
              status: false,
              date: new Date(),
              sum: d.price,
            })

            const editedDrink = await Phone.update(
              { amount: editedDrinkAmount.amount - d.order_phone.amount },
              { where: { id: d.id } }
            )
            res.json({ message: statusStr })
          }
        }
      }
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при обработке заказа" })
    }
  }
}

module.exports = new OrdersController()
