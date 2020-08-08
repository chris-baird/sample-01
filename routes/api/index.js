
const router = require("express").Router();
const authRoutes = require("./auth");

// Auth routes
router.use("/external", authRoutes);

module.exports = router;