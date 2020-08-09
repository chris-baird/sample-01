const axios = require("axios");

export default {
  // Takes in a user id and retrieves all the short term goals
  getAllSortTermGoals: (userId, token) => {
    return axios.get(`/api/short-term-goal/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createShortTermGoal: (userId, shortTermGoal, token) => {
    return axios.post(`/api/short-term-goal/${userId}`, shortTermGoal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
