const router = require("express").Router();
const apiRoutes = require("./api");

// Auth routes
router.use("/api", apiRoutes);

module.exports = router;