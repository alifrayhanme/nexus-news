const { Router, urlencoded, json } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller.js");
const {
  checkAuthentication,
  checkAuthorization,
} = require("../middlewares/checkAuth.middleware.js");
const { authLimiter, userValidation, registerValidation, handleValidationErrors } = require("../middlewares/security.middleware.js");
const router = Router();

router.use(urlencoded({ extended: true }));
router.use(json());

router.post("/register", authLimiter, registerValidation, handleValidationErrors, registerUser);
router.post("/login", authLimiter, userValidation, handleValidationErrors, loginUser);
router.post("/logout", logoutUser);

// Check for Private routes authentication
router.post("/test", checkAuthentication, (req, res) => {
  res.send({
    message: "Private route authentiaction success",
  });
});

// Check for role specific  routes
router.post(
  "/user",
  checkAuthentication,
  (req, res, next) => checkAuthorization(req, res, next, "user"),
  (req, res) => {
    res.send({
      message: "User role authorization successful",
    });
  }
);

router.post(
  "/admin",
  checkAuthentication,
  (req, res, next) => checkAuthorization(req, res, next, "admin"),
  (req, res) => {
    res.send({
      message: "Admin role authorization successful",
    });
  }
);

module.exports = router;
