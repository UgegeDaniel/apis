import { NextFunction, Request, Response } from 'express';
import logger from '../logger';

const logReqUrl = (req: Request, res: Response, next: NextFunction) => {
  logger.info(req.originalUrl);
  next();
};

export default logReqUrl;
