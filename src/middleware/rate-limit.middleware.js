import redis from "../config/redis.js";

export const ApiRateLimit = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const limit = 3;
  const duration = 60;
  const currentCount = await redis.incr(ip);
  await redis.expire(ip, 3);
  const value = await redis.get(ip);

  if (currentCount === 1) {
    await redis.expire(ip, duration);
  }

  if (currentCount > limit) {
    return res.status(429).json({
      message: "Has realizado muchas solicitudes, intenta por favor más tarde",
    });
  }

  next();
};
