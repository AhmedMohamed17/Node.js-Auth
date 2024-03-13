const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //check jwt exists & is verified
  if (token) {
    jwt.verify(token, "Ronaldo", (err, decodeToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodeToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "Ronaldo", async (err, decodeToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;

        next();
      } else {
        console.log(decodeToken);
        let user = await User.findById(decodeToken.id);
        res.locals.user = user;

        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = { requireAuth, checkUser };
