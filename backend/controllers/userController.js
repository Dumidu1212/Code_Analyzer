import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// User registration (signup)
export const signup = async (req, res) => {
  const { userName, email, password, mobileNumber, occupation } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      mobileNumber,
      occupation,
    });

    await newUser.save();
    res.status(201).json({ status: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// User login (signin)
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ status: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ userName: user.userName, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ status: true, message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};

// Get user data (requires authentication)
export const getUserData = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      userId: user._id,
      userName: user.userName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      profileImg: user.profileImg,
      occupation: user.occupation,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
