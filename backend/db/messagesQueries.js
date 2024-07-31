const CustomError = require("../utils/ErrorClass");
const pool = require("./pool");
exports.getAllMessages = async () => {
  try {
    const query = `
        SELECT messages.id, title, text, timestamp, clubs.name AS club_name,club_id FROM messages JOIN clubs ON messages.club_id = clubs.id;
        `;

    const { rows } = await pool.query(query);
    console.log("db messgaes", rows);
    return rows;
  } catch (error) {
    return error;
  }
};
exports.getMembersMessages = async (clubs) => {
 
  try {
    const query = `
        SELECT messages.id, title, messages.text, messages.timestamp, users.username, messages.club_id FROM messages JOIN users ON messages.user_id = users.id ;
        `;

    const { rows } = await pool.query(query);
    console.log("db messgaes", rows);
    
    const filteredMessages = rows.map((message) => {
      if (clubs.includes(message.club_id)) {
        return message;
      }else{
        delete message.username
        return message;
      }
      
    });
      console.log("filteredMessages ", rows);

    return filteredMessages;
  } catch (error) {
    return error;
  }
};
exports.saveMessage = async (title, message, userId, clubId) => {
  try {
    const query = `
          INSERT INTO messages (title, text, user_id, club_id)
          VALUES ($1, $2, $3, $4) RETURNING *
         
          `;
    const values = [title, message, userId, clubId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    return error;
  }
};
