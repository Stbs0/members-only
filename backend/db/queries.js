const pool = require('./pool');
exports.saveUserIndb = async (firstName, lastName, username, passwordHash) => {
    const query = `
        INSERT INTO users (first_name, last_name, username, hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const values = [firstName, lastName, username, passwordHash];
    const { rows } = await pool.query(query, values);
    return rows
};
