const passport = require('passport');

require('./auth');
const express = require('express');



const authRouter = express.Router();


const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const JWT_SECRET = process.env.JWT_PASSCODE;

function isLogedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', async(err, user) => {
    if (err || !user) {
      return res.redirect('/auth/googlegnot');
    }

    req.logIn(user, async (err) => {
      if (err) {
        return res.redirect('/auth/googlegnot'); 
      }

      console.log(user);
      res.cookie('google',user);
      res.json({ user: 'authenticated' });
    });
  })(req, res, next);
});

authRouter.get('/googleg', isLogedIn, (req, res) => {
  res.render('userDetails', { displayName: req.user.displayName });
});




authRouter.get('/googlegnot', (req, res) => {
  console.log('goognot');
  res.send('googlenot');
});


authRouter.get('/auth/userDetails', (req, res) => {
  
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

 
  res.json({ user: req.user });
});
module.exports = authRouter;