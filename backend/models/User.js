import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String },
    role: { type: String, default: 'user' },
    profileImg: { type: String },
    occupation: { type: String },
    status: { type: String, default: 'Active' },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
