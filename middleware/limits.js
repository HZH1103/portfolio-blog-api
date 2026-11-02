const rateLimit = require('express-rate-limit').rateLimit;

// Keep one shared counter for login and registration attempts from each IP.
exports.authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: 'Too many attempts. Try again in 15 minutes.' } }
});

// Public contact submissions use a separate, smaller allowance.
exports.contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: 'Too many messages. Try again in 15 minutes.' } }
});
