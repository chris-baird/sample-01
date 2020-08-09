const db = require("../models");
const _ = require("lodash");
module.exports = {
  // Test method
  getMessages: (req, res) => {
    res.send({
      msg: "Your access token was successfully validated!",
    });
  },

  // Creates a new short term goal and sends it as json
  createShortTermGoal: (req, res) => {
    // Picking off only the required data from the req body
    const newShortTermGoal = _.pick(req.body, ["goal", "description"]);
    db.ShortGoal.create({ ...newShortTermGoal, userId: req.params.userId })
      .then((dbShortGoal) => res.json(dbShortGoal))
      .catch((err) => res.json(err));
  },

  // Gets all the users short term goals and send them as json
  getShortTermGoals: (req, res) => {
    db.ShortGoal.find({ userId: req.params.userId })
      .then((dbShortgoals) => res.json(dbShortgoals))
      .catch((err) => res.json(err));
  },

  // Finds a short term goal by id and updates from the body
  updateStortTermGoal: (req, res) => {
    // Picking off only the required data from the req body
    const updatedShortTermGoal = _.pick(req.body, ["goal", "description"]);
    db.ShortGoal.findByIdAndUpdate({ _id: req.params.id }, updatedShortTermGoal)
      .then((dbShortTermGoal) => res.json(dbShortTermGoal))
      .catch((err) => res.json(err));
  },

  // Deletes a short term goal by id
  deleteShortTermGoal: (req, res) => {
    db.ShortGoal.findByIdAndDelete({ _id: req.params.id })
      .then((dbDeletedShortTermGoal) => res.json(dbDeletedShortTermGoal))
      .catch((err) => res.json(err));
  },
};
