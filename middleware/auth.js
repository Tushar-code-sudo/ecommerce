const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  console.log("authHeader", authHeader);

  const token = authHeader.split(" ")[1];
  console.log("token", token);
  try {
    const userData = jwt.verify(token, "SECRET_KEY");
    req.user = userData;
    console.log(userData);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
