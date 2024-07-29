const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../../db/queries");
const encryption = require("../encryption");
const CostumeError = require("../../utils/ErrorClass");
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);
      console.log(user)
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await encryption.checkPassword(password, user.hash);
      console.log(isMatch)
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("first")
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
  try {
    const user = await db.getUserById(id);
    if (!user) {
      return done(null, false);
    }

    const userClubs = await db.getUserClubs(id);
    user.clubs = userClubs;

    done(null, user); // Successfully deserialized user
  } catch (error) {
    // Handle any errors that occur during the asynchronous operations
    done(error, null);
  }
});

