import type { Request, Response } from 'express';

export const SignUp = async (req: Request, res: Response) => {
  try {
    console.log('sign up');
    res.status(200).json({ message: 'Sign up successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    console.log('login');
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
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
