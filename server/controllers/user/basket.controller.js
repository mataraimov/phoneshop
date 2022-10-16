const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
  Brand,
  Drink,
  Order,
  User,
  Basket_Phone,
  Phone,
} = require("../../models/models")

class BasketController {
  async add(req, res, next) {
    try {
      const { drinkId, amount } = req.body
      const userId = req.user.id
      if (!drinkId || !amount) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const candidate = await Basket_Phone.findOne({
          where: { userId, phoneId: drinkId },
        })
        if (candidate) {
          return res
            .status(404)
            .json({ message: "Данный товар уже в вашей корзине" })
        } else {
          const basketItem = await Basket_Phone.create({
            phoneId: drinkId,
            amount,
            userId,
          })
          res.json({
            message: "Вы успешно занесли товар в корзину",
            basketItem,
          })
        }
      }
    } catch (error) {
      res
        .status(505)
        .json({ message: "Ошибка при добавлении телефона в корзину" })
    }
  }
  async getAll(req, res, next) {
    try {
      const id = req.user.id
      const user = await User.findOne({
        where: { id },
        include: [
          {
            model: Phone,
            attributes: {
              exclude: ["logo", "brandId"],
            },
          },
        ],
        attributes: { exclude: ["email", "id", "password", "role"] },
      })
      res.json({ drinks: user.phones })
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при получении товара" })
    }
  }
  async delete(req, res, next) {
    try {
      const userId = req.user.id
      const { id } = req.params
      const deletedItem = await Basket_Phone.destroy({
        where: { userId, id },
      })
      res.json({ message: "Вы успешно удалили товар из корзины" })
    } catch (error) {
      console.log(error.message)
      res
        .status(505)
        .json({ message: "Ошибка при удалении товаров из корзине" })
    }
  }
}

module.exports = new BasketController()
