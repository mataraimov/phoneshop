const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const projectionController = require("../../controllers/admin/phone.controller")

router.post("/add", roleMiddleware("admin"), projectionController.add)
router.post(
  "/receipt",
  roleMiddleware("admin"),
  projectionController.receiptPhone
)
router.get("/getById/:id", projectionController.getById)
router.get("/getByPagination", projectionController.getFilteredDrinks)
router.get("/getByFilter", projectionController.getFilteredDrinks)

module.exports = router
