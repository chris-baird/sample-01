const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortGoalSchema = new Schema({
  userId: { type: String, required: true },
  goal: { type: String, required: true },
  description: { type: String, required: true },
});

const ShortGoal = mongoose.model("ShortGoal", shortGoalSchema);

module.exports = ShortGoal;
