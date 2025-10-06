import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Default global rate limit
const globalRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60s"),
});

// Helper for custom limits per route
export const customRateLimiter = ({ max = 100, window = "60s" } = {}) => {
  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(max, window),
  });

  return async (req, res, next) => {
    try {
      const key = req.user?._id || req.ip || "global";
      const { success } = await limiter.limit(`ratelimit_${key}`);
      if (!success) {
        return res.status(429).json({
          message: "Too many requests, please try again later",
        });
      }
      next();
    } catch (error) {
      console.error("Rate limit error", error);
      next(error);
    }
  };
};

// Global default middleware
const rateLimiter = async (req, res, next) => {
  try {
    const key = req.user?._id || req.ip || "global";
    const { success } = await globalRateLimit.limit(`ratelimit_${key}`);
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    next();
  } catch (error) {
    console.error("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
