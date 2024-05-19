const passport = require('passport');
const express = require('express');
const authRouter = express.Router();

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
        httpOnly: false,
        secure: true,
        sameSite: 'None'
      });
      res.redirect(process.env.CORS_ORIGIN);
    });
  })(req, res, next);
});

authRouter.get('/googleg', (req, res) => {
  if (!req.user) return res.sendStatus(401);
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
