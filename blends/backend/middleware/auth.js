const jwt = require("jsonwebtoken");

/*
 Expect senior dev's JWT_SECRET; token must encode user id and email.
 If senior dev already has an auth middleware, just reuse it instead.
*/
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // expect { id, email, name } or similar
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
