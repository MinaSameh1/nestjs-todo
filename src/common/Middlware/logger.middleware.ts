import { Request, Response, NextFunction } from 'express'
import logger from 'src/common/utils/logger'

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on('finish', () => {
    logger.info(
      `${req.method} ${req.originalUrl} - ${res.statusCode} ${res.get(
        'content-length'
      )} - ${req.get('user-agent')} ${req.ip}`
    )
  })
  next()
}
