const router = require("express").Router();
const shortGoalController = require("../../controllers/shortGoalController");

router.route("/").post(shortGoalController.createShortTermGoal);

router.route("/").get(shortGoalController.getShortTermGoals);

module.exports = router;
