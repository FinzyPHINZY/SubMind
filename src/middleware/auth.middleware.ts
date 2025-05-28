import jwt from 'jsonwebtoken';

import User from '../models/user.model';

import type { NextFunction, Request, Response } from 'express';

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    const authorization = req.headers.authorization;

    if (authorization?.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      const error = new Error('Not authorized, no token') as Error & {
        statusCode: number;
      };
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      const error = new Error('User not found') as Error & {
        statusCode: number;
      };
      error.statusCode = 404;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
