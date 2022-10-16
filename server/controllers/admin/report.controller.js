const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Brand, Order, User, Phone } = require("../../models/models")
const { Op } = require("sequelize")
const sequelize = require("sequelize")

class CouponController {
  async getReportByDates(req, res, next) {
    try {
      const { startDate, endDate } = req.query
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
        // order: [["date", "DESC"]],
        where: {
          [Op.or]: [
            {
              date: {
                [Op.between]: [startDate, endDate],
              },
            },
          ],
          status: 2,
        },
      })
      const total_sum = await Order.sum("sum", {
        where: {
          [Op.or]: [
            {
              date: {
                [Op.between]: [startDate, endDate],
              },
            },
          ],
          status: 2,
        },
      })
      return res.json({ orders, total_sum })
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при получении отчета" })
    }
  }
}

module.exports = new CouponController()
