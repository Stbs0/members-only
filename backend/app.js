const express = require("express");
const homeRouter = require("./routers/homeRouter");
const session = require("express-session");
const passport = require("passport");
const pool = require("./db/pool");
const PgStore = require("connect-pg-simple")(session);
const signUpRouter = require("./routers/signUpRouter");
const joinClubRouter = require("./routers/joinClubRouter");
const logInRouter = require("./routers/logInRouter");

const middlewares = require("./utils/middlewares");
const app = express();

const store = new PgStore({
  pool: pool,
  createTableIfMissing: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//middleware
app.use(middlewares.requestLogger);

//session
app.use(
  session({
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
require("./utils/passport/passport");

app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});
//routers
app.use("/", homeRouter);
app.use("/sign-up", signUpRouter);
app.use("/join-club", joinClubRouter);
app.use("/log-in", logInRouter);

app.use(middlewares.errorHandlerMiddleware);
app.listen(3000, () => console.log("Server started on port 3000"));
