const userQueries = require("./usersQueries");
const messagesQueries = require("./messagesQueries");
const clubsQueries = require("./clubsQueries");

module.exports = {
  ...userQueries,
  ...messagesQueries,
  ...clubsQueries,
};
