const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const reportController = require("../../controllers/admin/report.controller")

router.get("/getReportByDates", roleMiddleware("admin"), reportController.getReportByDates)

module.exports = router
