import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import sendMail from "../Mail/sendMail.js";
import htmlBody from "../Mail/mailBody.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);

      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email
          });
          sendMail(email, `Welcome to ExpenseDiary ${profile.displayName}`, "", htmlBody(profile.displayName));
        }

        return cb(null, user, { message: "Login successful" });
      } catch (error) {
        return cb(error);
      }
    }
  )
);

export default passport;
