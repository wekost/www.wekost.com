const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).json({ message: "Token tidak ditemukan" });

  const token = authHeader.split(" ")[1]; // pastikan split spasi
  if (!token) return res.status(403).json({ message: "Token tidak valid" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid" });
    req.user = user;
    next();
  });
};
