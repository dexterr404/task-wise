import passport from "passport";

export const startGoogleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: req.passportState || ""
  })(req, res, next);
};