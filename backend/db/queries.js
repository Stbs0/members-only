const pool = require("./pool");

// user
exports.saveUserIndb = async (firstName, lastName, username, passwordHash) => {
  const query = `
        INSERT INTO users (first_name, last_name, username, hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
  const values = [firstName, lastName, username, passwordHash];
  const { rows } = await pool.query(query, values);
  return rows;
};

exports.getUserByUsername = async (username) => {
  const query = `
    SELECT * FROM users WHERE username = $1;
    `;
  const values = [username];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getUserById = async (id) => {
  const query = `
   SELECT * FROM 
    users
WHERE 
    users.id = $1;
    `;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
exports.getUserInfo = async (id) => {
  const query = `
   SELECT first_name, last_name, username, id FROM 
    users
WHERE 
    users.id = $1;
    `;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// clubs
exports.saveUserInClub = async (username, clubName) => {
  const query = `
    INSERT INTO user_clubs (user_id,club_id)
    VALUES (
    (SELECT id FROM users where username = $1 ),
    (SELECT id FROM clubs where name = $2 )
    ); 
    `;
  const values = [username, clubName];

  await pool.query(query, values);
};

exports.getUserClubs = async (userId) => {
  const query = `
    SELECT DISTINCT club_id FROM user_clubs WHERE user_id = $1;
    `;
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows.map((club) => club.club_id);
};

// messages
exports.getAllMessages = async () => {
  const query = `
  SELECT messages.id, title, text, timestamp, club_id FROM messages JOIN clubs ON messages.club_id = clubs.id;
  `;

  const { rows } = await pool.query(query);
  console.log("db messgaes",rows);
  return rows;
};
exports.saveMessage = async (title, message, userId) => {
  const query = `
    INSERT INTO messages (title, text, user_id)
    VALUES ($1, $2, $3)
   
    `;
  const values = [title, message, userId];
  await pool.query(query, values);
};
