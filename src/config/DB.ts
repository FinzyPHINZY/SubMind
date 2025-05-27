import mongoose from 'mongoose';

import { config } from 'dotenv';

config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
