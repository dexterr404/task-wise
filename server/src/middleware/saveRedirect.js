export const saveRedirect = (req, res, next) => {
  const redirect = req.query.redirect || "";
  req.passportState = redirect;
  next();
};