const pool = require("./pool");

const getClubPasscode = async (clubId) => {
  try {
    const query = `
          SELECT passcode FROM clubs WHERE id = $1;
          `;
    const values = [clubId];

    const { rows } = await pool.query(query, values);
    return rows[0].passcode;
  } catch (error) {
    return error;
  }
};

const saveUserInClub = async (userId, ClubId) => {
  try {
    const query = `
          INSERT INTO user_clubs (user_id,club_id)
          VALUES ($1,$2); 
          `;
    const values = [userId, ClubId];

    await pool.query(query, values);
  } catch (error) {
    return error;
  }
};
const getClub = async (clubId) => {
  try {
    const query = `
          SELECT * FROM clubs WHERE id = $1;
          `;
    const values = [clubId];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    return error;
  }
};
const getAllClubs = async () => {
  try {
    const query = `
          SELECT id,name,description FROM clubs ;
          `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const getUserClubs = async (userId) => {
  try {
    const query = `
          SELECT DISTINCT club_id FROM user_clubs WHERE user_id = $1;
          `;
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows.map((row) => row.club_id);
  } catch (error) {
    return error;
  }
};
const getClubById = async (clubId) => {
  console.log(clubId)
  try {
    const query = `
          SELECT id, name, description FROM clubs WHERE id = $1;
          `;
    const values = [clubId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  getClubPasscode,
  saveUserInClub,
  getClub,
  getAllClubs,
  getUserClubs,
  getClubById,
};
