const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const uuid4 = require("uuid4")

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
  },
  { timestamps: false }
)
const Phone = sequelize.define(
  "phone",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: false, unique: true },
    logo: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
    amount: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
)
const Brand = sequelize.define(
  "brand",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
  },
  { timestamps: false }
)

const History = sequelize.define("history", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.BOOLEAN },
  amount: { type: DataTypes.INTEGER },
  sum: { type: DataTypes.DECIMAL },
  date: { type: DataTypes.DATE },
})

const Order = sequelize.define(
  "order",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sum: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATE },
    status: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { timestamps: false }
)
//Order status
// case 0:
//   statusStr = "Отказано"
//   break
// case 1:
//   statusStr = "В ожидании"
//   break
// case 2:
//   statusStr = "Выполнено"


const Order_Phone = sequelize.define(
  "order_phone",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
)

const Basket_Phone = sequelize.define(
  "basket_phone",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
)

//relations

Brand.hasMany(Phone, { onDelete: "cascade", onUpdate: "cascade" })
Phone.belongsTo(Brand)

Phone.hasMany(History)
History.belongsTo(Phone)

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Phone, { through: Order_Phone })
Phone.belongsToMany(Order, { through: Order_Phone })

User.belongsToMany(Phone, { through: Basket_Phone })
Phone.belongsToMany(User, { through: Basket_Phone })

module.exports = {
  User,
  Phone,
  Brand,
  Order,
  History,
  Basket_Phone,
  Order_Phone,
}
