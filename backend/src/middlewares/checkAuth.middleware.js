const jwt = require("jsonwebtoken");

function checkAuthentication(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Access token required",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Malformed authentication token",
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured");
    return res.status(500).json({
      success: false,
      message: "Server configuration error",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

function checkAuthorization(req, res, next, userRole) {
  const { role } = req.user;

  if (role !== userRole)
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });

  next();
}
module.exports = { checkAuthentication, checkAuthorization };
