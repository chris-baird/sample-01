const axios = require("axios");

export default {
  // Takes in a user id and token then submits a get request to backend api
  getAllSortTermGoals: (userId, token) => {
    return axios.get(`/api/short-term-goal/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // Takes in a user id, short term goal and token, then submits a post reqest to backend api
  createShortTermGoal: (userId, shortTermGoal, token) => {
    return axios.post(`/api/short-term-goal/${userId}`, shortTermGoal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
