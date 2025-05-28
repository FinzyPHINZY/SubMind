import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      requireed: [true, 'User email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: 8,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
