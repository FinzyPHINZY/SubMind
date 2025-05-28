import type { Document, Types } from 'mongoose';

export type UserInput = {
  name: string;
  email: string;
  password: string;
};

export type IUser = Document & {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
