import Redis from 'ioredis';
import type { Request, Response, NextFunction } from 'express';

const redisClient = new Redis();

const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;
  const cachedData = await redisClient.get(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  res.sendResponse = res.send;
  res.send = (body) => {
    redisClient.set(key, JSON.stringify(body), 'EX', 60 * 15); // Cache for 15 minutes
    res.sendResponse(body);
  };

  next();
};

export default cacheMiddleware;
