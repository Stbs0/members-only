const CustomError = require("../utils/ErrorClass");
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

const saveUserInClub = async (userId, ClubId, isAdmin=false) => {
  try {
    const query = `
          INSERT INTO user_clubs (user_id,club_id,admin)
          VALUES ($1,$2,$3); 
          `;
    const values = [userId, ClubId, isAdmin];

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
const createClub = async (name, description, passcode, userId) => {
  try {
    const query = `
    INSERT INTO clubs (name,description,passcode,admin_id)
    VALUES ($1,$2,$3,$4)
    RETURNING id,name, description,admin_id;
    `;

    const values = [name, description, passcode, userId];
    const { rows } = await pool.query(query, values);
    console.log(rows);

    return rows[0];
  } catch (error) {
    throw new CustomError(error);
  }
};
const deleteClub = async (clubId) => {
  try {
    const query = `
          DELETE FROM clubs WHERE id = $1;
          `;
    const values = [clubId];
    await pool.query(query, values);
  } catch (error) {
    return error;
  }
};

const getClubMembers = async (clubId) => {
  try {
    const query = `
          SELECT DISTINCT users.id, username,first_name,last_name, role FROM user_clubs JOIN users ON user_clubs.user_id = users.id WHERE club_id = $1;
          `;
    const values = [clubId];
    const { rows } = await pool.query(query, values);
    console.log(rows)
    return rows;
  } catch (error) {
    throw new CustomError(error);
  }
};

module.exports = {
  getClubPasscode,
  saveUserInClub,
  getClub,
  getAllClubs,
  getUserClubs,
  getClubById,
  createClub,
  deleteClub,
  getClubMembers,
};
