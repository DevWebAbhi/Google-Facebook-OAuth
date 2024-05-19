const express = require("express");
const app = express();
app.use(express.json());
const session = require('express-session');
const passport = require('passport');
const authRouter = require("./GoogleAuthentication/authRouter");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
require('dotenv').config();
app.use(cors({
  origin: 'https://sweton-full-stack.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get("/",(req,res)=>{
    res.status(200).send({msg:"This is Backend"});
});

app.use('/auth', authRouter);

app.listen(PORT,async()=>{
    try {
        console.log("Connected to server");
    } catch (error) {
        console.error("Not connected to server");
    }
});


