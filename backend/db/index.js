const userQueries = require("./usersQueries");
const messagesQueries = require("./messagesQueries");


module.exports = {
  ...userQueries,
  ...messagesQueries,
};
