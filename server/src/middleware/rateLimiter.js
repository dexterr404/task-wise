import rateLimit from "../config/upstash.js"

const rateLimiter = async(req,res,next) => {
    try {
        const key = req.ip || "global";
        const {success} = await rateLimit.limit(`ratelimit_${key}`);
        if(!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later"
            });
        }
        next();
    } catch (error) {
        console.error("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter