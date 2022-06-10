import { Request, Response, NextFunction } from 'express';
import logger from 'src/utils/logger';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(`Request Recieved ${req.url}`);
  next();
}
