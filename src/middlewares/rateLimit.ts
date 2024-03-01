import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // Set `RateLimit` and `RateLimit-Policy`` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:
    "Too many accounts created from this IP, please try again after 1 hour",
});
