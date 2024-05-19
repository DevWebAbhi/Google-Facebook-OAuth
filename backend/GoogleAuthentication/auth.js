const passport=require('passport');
require('dotenv').config();

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL=process.env.GOOGLE_CALLBACK_URL;

console.log("GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", GOOGLE_CLIENT_SECRET);
console.log("GOOGLE_CALLBACK_URL:", GOOGLE_CALLBACK_URL);


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  console.log("GoogleStrategy callback:", profile);
  console.log(profile.displayName)
  done(null, profile);
}));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});