const express = require("express");
const session = require('express-session');
const passport = require('passport');
const authRouter = require("./GoogleAuthentication/authRouter");
const cors = require("cors");
require('dotenv').config();
require('./GoogleAuthentication/auth');

const app = express();
const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(express.json());
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    sameSite: 'None' 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "This is Backend" });
});

app.use('/auth', authRouter);

app.listen(PORT, async () => {
  try {
    console.log(`Connected to server on port ${PORT}`);
  } catch (error) {
    console.error("Not connected to server", error);
  }
});
