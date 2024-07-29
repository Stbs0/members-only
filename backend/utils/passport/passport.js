const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../../db/queries");
const encryption = require("../encryption");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await encryption.checkPassword(password, user.hash);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await db.getUserById(id);
  const userClubs = await db.getUserClubs(id);
  console.log(userClubs)
  user.clubs = userClubs
  done(null, user);
});

