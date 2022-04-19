const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { googleClientID, googleClientSecret } = require("../config/keys");
const client = require("../connection");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const queryString = `SELECT * FROM users WHERE id='${id}'`;
  client.query(queryString, (error, result) => {
    if (error) {
      done(error, null);
    } else {
      done(null, result.rows[0]);
    }
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const profileId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;
      const avatar = profile.photos[0].value;
      const queryString = `SELECT * FROM users WHERE profileid='${profileId}'`;
      client.query(queryString, (error, result) => {
        if (error) {
          done(error, null);
        } else {
          if (result.rowCount === 0) {
            const queryString = `INSERT INTO users(profileId,name,email,avatar) VALUES($1,$2,$3,$4) RETURNING *`;
            const values = [profileId, name, email, avatar];
            client.query(queryString, values, (error, result) => {
              if (error) {
                done(error, null);
              } else {
                done(null, result.rows[0]);
              }
            });
          } else {
            done(null, result.rows[0]);
          }
        }
      });
    }
  )
);
