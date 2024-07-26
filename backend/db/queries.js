const pool = require("./pool");
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

exports.getClubPasscode = async (name) => {
  const query = `
    SELECT passcode FROM clubs WHERE name like $1;
    `;
  const values = [name];

  const result = await pool.query(query, values);
  const rows = result.rows;
  return rows[0];
};
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
exports.getUserByUsername= async (username) => {
  const query = `
    SELECT * FROM users WHERE username = $1;
    `;
  const values = [username];
  const { rows } = await pool.query(query, values);
  return rows[0];
}
exports.getUserById = async (id) => {
  const query = `
    SELECT * FROM users WHERE id = $1;
    `;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

