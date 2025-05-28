import User from '../models/user.model.js';

import type { NextFunction, Request, Response } from 'express';

export const GetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: 'users fetched successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    next(error);
  }
};

export const GetUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      const error = new Error('User not found') as Error & {
        statusCode: number;
      };
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: `User with ID ${userId} fetched successfully`,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    next(error);
  }
};
export const CreateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // Simulate user creation
    res.status(201).json({
      message: 'User created successfully',
      user: userData,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    // Simulate user update
    res.status(200).json({
      message: `User with ID ${userId} updated successfully`,
      user: userData,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    // Simulate user deletion
    res.status(200).json({
      message: `User with ID ${userId} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
