const passport = require("passport");
const redirectURL=require("../config/keys");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"),(req,res)=>{
    res.redirect(redirectURL);
  });

  app.get("/api/current_user", (req, res) => {
    console.log('frontend',req.user);
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
