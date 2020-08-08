const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const longGoalSchema = new Schema({
  goal: { type: String, required: true },
  description: { type: String, required: true },
  contributions: { type: Number, required: true },
  goalDate: { type: Date, required: true },
});

const LongGoal = mongoose.model("LongGoal", longGoalSchema);

module.exports = LongGoal;
