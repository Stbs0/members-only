const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pool = require("./db/pool");
const PgStore = require("connect-pg-simple")(session);
// import routers
const routers = require("./routers/indexRouter");
// import middlewares
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
require("./utils/passport");

app.use(passport.session());

app.use((req, res, next) => {
  console.log("session",req.session);
  console.log("user:",req?.user);
  next();
});
//routers
// app.use("/", routers.homeRouter);
app.use("/api/users",  routers.usersRouter);
app.use("/api/auth", routers.authRouter);
app.use("/api/messages", routers.messagesRouter);
app.use("/api/clubs", routers.clubsRouter);


// app.use("/create-message", routers.createMessageRouter);
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandlerMiddleware);


app.listen(3000, () => console.log("Server started on port 3000"));
