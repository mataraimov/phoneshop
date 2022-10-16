"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("brands", [
      {
        name: "Samsung",
      },
      {
        name: "Iphone",
      },
      {
        name: "Xiaomi",
      },
    ])
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("brands", null, {}),
}
