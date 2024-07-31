const CustomError = require("../utils/ErrorClass");
const pool = require("./pool");

exports.getMessages = async (userClubs = []) => {
  let query;

  if (userClubs.length > 0) {
    query = `
        SELECT messages.id, title, text, timestamp, users.username, clubs.name AS club_name, messages.club_id
        FROM messages
        JOIN users ON messages.user_id = users.id
        JOIN clubs ON messages.club_id = clubs.id;
      `;
  } else {
    query = `
        SELECT messages.id, title, text, timestamp, clubs.name AS club_name, messages.club_id
        FROM messages
        JOIN clubs ON messages.club_id = clubs.id;
        `;
  }

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    throw CustomError(error);
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
    throw CustomError(error);
  }
};
exports.getMessageById = async (messageId) => {
  try {
    const query = `
          SELECT messages.id, title, text, timestamp, users.username, clubs.name AS club_name, messages.club_id
          FROM messages
          JOIN users ON messages.user_id = users.id
          JOIN clubs ON messages.club_id = clubs.id
          WHERE messages.id = $1
        `;
    const values = [messageId];
    const { rows } = await pool.query(query, values);
    return rows[0];
    
  } catch (error) {
    throw new CustomError(error);
  }
};
