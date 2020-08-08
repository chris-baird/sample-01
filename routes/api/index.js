const router = require("express").Router();
const authRoutes = require("./auth");
const shortGoalRoutes = require("./shortGoalRoutes");

// Test route
router.use("/external", authRoutes);

router.use("/short-term-goal", shortGoalRoutes);

module.exports = router;
