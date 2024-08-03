const db = require("../db/index");
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
  const userId = req.user.id;
  const club = await db.createClub(
    name,
    description,
    passcode,
    req.user.id,
    true,
  );
  await db.saveUserInClub(userId, club.id, true);
  await db.changeUserRole(userId, "club-admin");

  res.status(201).json(club);
});

const deleteClub = asyncHandler(async (req, res, next) => {
  const clubId = req.params.clubId;
  await db.deleteClub(clubId);

  res.status(204).end();
});


const getClubMembers = asyncHandler(async (req, res, next) => {
  const clubId = req.params.clubId;
  console.log(clubId)
  const members = await db.getClubMembers(clubId);
  res.json(members);
})
module.exports = {
  joinClub,
  getClubs,
  getClub,
  createClub,
  deleteClub,
  getClubMembers,
};
