const passport = require('passport');
const express = require('express');
const authRouter = express.Router();

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', async (err, user) => {
    if (err || !user) {
      return res.redirect('/auth/googlegnot');
    }

    req.logIn(user, async (err) => {
      if (err) {
        return res.redirect('/auth/googlegnot');
      }

      res.cookie('google', JSON.stringify(user), {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      });
      res.redirect(CORS_ORIGIN);
    });
  })(req, res, next);
});

authRouter.get('/googleg', isLoggedIn, (req, res) => {
  res.render('userDetails', { displayName: req.user.displayName });
});

authRouter.get('/googlegnot', (req, res) => {
  res.send('googlenot');
});

authRouter.get('/auth/userDetails', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({ user: req.user });
});

module.exports = authRouter;
