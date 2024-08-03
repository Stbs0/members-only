const db = require("../db/index");
const CostumeError = require("../utils/ErrorClass");
const asyncHandler = require("express-async-handler");

const joinClub = asyncHandler(async (req, res, next) => {
  await db.saveUserInClub(req.user.id, req.params.clubId);
  res.redirect("/");
});

const getClubs = asyncHandler(async (req, res, next) => {
  const clubs = await db.getAllClubs();
  res.json(clubs);
});

const getClub = asyncHandler(async (req, res, next) => {
  console.log(req.params.clubId);
  const club = await db.getClubById(req.params.clubId);
  res.json(club);
});

const createClub = asyncHandler(async (req, res, next) => {
  const { name, description, passcode } = req.body;

  const club = await db.createClub(name, description, passcode, req.user.id);

  res.status(201).json(club);
});
module.exports = {
  joinClub,
  getClubs,
  getClub,
  createClub,
};
