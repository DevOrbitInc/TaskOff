const express = require("express");
const { register, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

const router = express.Router();

// authLimiter runs before validate() so a flood of malformed bodies is turned
// away before we spend anything parsing them.
router.post("/register", authLimiter, validate({ body: registerSchema }), register);
router.post("/login", authLimiter, validate({ body: loginSchema }), login);

router.get("/me", protect, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

module.exports = router;
