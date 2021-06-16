const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./db/models/User');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          imgUrl: profile.photos[0].value,
          password: profile.id,
          email: `${profile.id}@email.com`,
        };
        try {
          let user = await User.findOne({ where: { googleId: profile.id } });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id, (err, user) => done(err, user));
  });
};
