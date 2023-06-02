const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    const KEY = process.env.SECRET_KEY;
    const user = jwt.verify(token, KEY);
    if (!user) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    req.user = { user_id: user.id };

    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = isAuth;
