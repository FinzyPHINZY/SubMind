import type { NextFunction, Request, Response } from 'express';
import { arcjet } from '../config/arcjet';

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const decision = await arcjet.protect(req, { requested: 1 });
    console.log('Arcjet decision', decision);

    if (decision.isDenied) {
      if (decision.reason.isRateLimit())
        res.status(429).json({ success: false, error: 'Rate limit exceeded' });

      if (decision.reason.isBot())
        res.status(403).json({ success: false, error: 'No bots allowed' });

      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.log('Arcjet error:', error);
    next(error);
  }
};

export default arcjetMiddleware;
