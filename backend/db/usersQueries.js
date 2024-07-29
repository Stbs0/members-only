const pool = require("./pool");

exports.saveUser = async (firstName, lastName, username, passwordHash) => {
  try {
    const query = `
          INSERT INTO users (first_name, last_name, username, hash)
          VALUES ($1, $2, $3, $4)
          RETURNING *
      `;
    const values = [firstName, lastName, username, passwordHash];
    const { rows } = await pool.query(query, values);
    return rows[0];
    
  } catch (error) {
    return error
  }
};

exports.getUserByUsername = async (username) => {
  try {
    const query = `
      SELECT * FROM users WHERE username = $1;
      `;
    const values = [username];
    const { rows } = await pool.query(query, values);
    return rows[0];
    
  } catch (error) {
    return error
  }
};

exports.getUserById = async (id) => {
  try {
    
    const query = `
     SELECT id, first_name, last_name, username FROM 
      users
  WHERE 
      users.id = $1;
      `;
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    return error
  }
};
exports.getUserInfo = async (id) => {
    try {
    
      const query = `
       SELECT first_name, last_name, username, id FROM 
        users
    WHERE 
        users.id = $1;
        `;
      const values = [id];
      const { rows } = await pool.query(query, values);
    
      return rows[0];
  } catch (error) {
    return error
  }
};

exports.updateUser = async (id,  username, first_name, last_name ) => {
    try {
    
      const query = `UPDATE users SET
        username = COALESCE($2, username),
        first_name = COALESCE($3, first_name),
        last_name = COALESCE($4, last_name)
       WHERE id = $1
       RETURNING username, first_name, last_name`;
      const values = [id, username, first_name, last_name];
      const { rows } = await pool.query(query, values);
      console.log("updateUser", rows[0]);
      return rows[0];
  } catch (error) {
    return error
  }
};

exports.deleteUserDB = async (id) => {
  try {
    
    const query = `DELETE FROM users WHERE id = $1`;
    const values = [id];
    await pool.query(query, values);
  } catch (error) {
    return error
  }
};


