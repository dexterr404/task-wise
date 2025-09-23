import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import passport from 'passport'
import User from '../models/User.js'

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/api/auth/google/callback",
        passReqToCallback: true
      },
    async function(request, accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
              // Create new user
              user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                profileImage: profile.photos[0]?.value || "",
              });
            }

            const token = generateToken(user._id);

            return done(null, {user, token});
        } catch (error) {
            return done(err, null);
        }
    }
));

export default passport;