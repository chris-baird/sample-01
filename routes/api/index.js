
const router = require("express").Router();
const authRoutes = require("./auth");

// Test route
router.use("/external", authRoutes);

module.exports = router;