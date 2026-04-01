/*
 * Assigned Member: Backend Member 1 (Auth & Admin Logic)
 * Required Functions: verifyToken and isAdmin middleware
 */

exports.verifyToken = (req, res, next) => {
  // verify JWT
  next();
};

exports.isAdmin = (req, res, next) => {
  // check if user is admin
  next();
};
