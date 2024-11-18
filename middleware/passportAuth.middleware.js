const passport = require("passport");
const model = require("../models/index.model");
const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "1234", // It's recommended to use environment variables for secrets.
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await model.User.findOne({ email: jwt_payload.email });

      if (user) {
        return done(null, user); // Authentication successful
      } else {
        return done(null, false, { message: "User not found" }); // User not found
      }
    } catch (error) {
      return done(error, false, { message: "Error during authentication" }); // General error
    }
  })
);

module.exports = passport;
