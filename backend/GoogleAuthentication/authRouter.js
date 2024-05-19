const passport = require('passport');

require('./auth');
const express = require('express');

// Import your User model or database schema

const authRouter = express.Router();


const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const JWT_SECRET = process.env.JWT_PASSCODE; // Replace with a strong and secure secret key

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
      return res.redirect('/auth/googlegnot'); // Redirect on failure
    }

    req.logIn(user, async (err) => {
      if (err) {
        return res.redirect('/auth/googlegnot'); // Redirect on login failure
      }

      console.log(user);
      res.cookie('google',"ttttttt");
      // Send user details and token as JSON response
      res.json({ user: 'authenticated',user });
    });
  })(req, res, next);
});

authRouter.get('/googleg', isLogedIn, (req, res) => {
  res.render('userDetails', { displayName: req.user.displayName });
});

// Set the view engine to EJS


authRouter.get('/googlegnot', (req, res) => {
  console.log('goognot');
  res.send('googlenot');
});


authRouter.get('/auth/userDetails', (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Return user details
  res.json({ user: req.user });
});
module.exports = authRouter;