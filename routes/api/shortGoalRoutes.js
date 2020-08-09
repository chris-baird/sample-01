const router = require("express").Router();
const shortGoalController = require("../../controllers/shortGoalController");

router.route("/:userId").post(shortGoalController.createShortTermGoal);

router.route("/:userId").get(shortGoalController.getShortTermGoals);

router.route("/:id").put(shortGoalController.updateStortTermGoal);

router.route("/:id").delete(shortGoalController.deleteShortTermGoal);

module.exports = router;
