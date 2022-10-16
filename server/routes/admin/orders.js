const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const ordersController = require("../../controllers/admin/orders.controller")

router.get("/getAll", roleMiddleware("admin"), ordersController.getAll)
router.post("/execute", roleMiddleware("admin"), ordersController.executeOrder)

module.exports = router
