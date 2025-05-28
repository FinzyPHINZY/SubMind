import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.model';

import type { NextFunction, Request, Response } from 'express';
import type { UserInput } from '../types/user';
import type { Secret } from 'jsonwebtoken';

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body as UserInput;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists') as Error & {
        statusCode: number;
      };
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: passwordHash,
        },
      ],
      { session }
    );

    const token = jwt.sign(
      { userId: newUsers[0]._id },
      process.env.JWT_SECRET as Secret,
      { expiresIn: '1d' }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { token, user: newUsers[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error during signup:', error);
    next(error);
  }
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User not found') as Error & {
        statusCode: number;
      };
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid password') as Error & {
        statusCode: number;
      };
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as Secret,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { token, user },
    });
  } catch (error) {
    console.error('Error during login:', error);
    next(error);
  }
};

export const SignOut = async (req: Request, res: Response) => {
  try {
    console.log('signout');
    res.status(200).json({ message: 'signout successful' });
  } catch (error) {
    console.error('Error during signout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
