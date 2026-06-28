const rateLimit = require("express-rate-limit");

const inquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many inquiries. Please try again after 10 minutes.",
  },
});

module.exports = {
  inquiryLimiter,
};