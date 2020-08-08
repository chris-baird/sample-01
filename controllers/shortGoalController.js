const db = require("../models");
const _ = require("lodash");
module.exports = {
  getMessages: (req, res) => {
    res.send({
      msg: "Your access token was successfully validated!",
    });
  },
  createShortTermGoal: (req, res) => {
    const newShortTermGoal = _.pick(req.body, ["goal", "description"]);
    console.log(newShortTermGoal);

    db.ShortGoal.create(newShortTermGoal)
      .then((dbShortGoal) => res.json(dbShortGoal))
      .catch((err) => res.json(err));
  },
  getShortTermGoals: (req, res) => {
    db.ShortGoal.find({})
      .then((dbShortgoals) => res.json(dbShortgoals))
      .catch((err) => res.json(err));
  },
};
