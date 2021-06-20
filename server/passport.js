const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./db/models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

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
          // imgUrl: profile.photos[0].value,
          password: profile.id,
          email: profile.emails[0].value,
        };
        try {
          let user = await User.findOne({ where: { googleId: profile.id } });
          if (user) {
            done(null, user);
          } else {
            const stripeUser = await stripe.customers.create({
              email: profile.emails[0].value,
            });
            user = await User.create(newUser);
            user.stripeAccount = stripeUser.id;
            user.save();
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
    const user = User.findByPk(id);
    done(null, user);
  });
};
