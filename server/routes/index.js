const Router = require("express")
const router = new Router()
const authRouter = require("./auth")
const brandRouter = require("./admin/brand")
const projectionRouter = require("./admin/phone")
const basketRouter = require("./user/basket")
const userOrderRouter = require("./user/orders")
const orderRouter = require("./admin/orders")
const reportRouter = require("./admin/report")

router.use("/auth", authRouter)
router.use("/brand", brandRouter)
router.use("/projection", projectionRouter)
router.use("/basket", basketRouter)
router.use("/userOrders", userOrderRouter)
router.use("/orders", orderRouter)
router.use("/reports", reportRouter)

module.exports = router
