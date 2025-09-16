import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import analysisRoutes from './routes/analysisRoutes.js';
import securityRoutes from './routes/securityRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import notFound from './middlewares/notFoundMiddleware.js';

dotenv.config();
connectDB();

// CORS configuration to allow frontend origin and cookies
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // HTTP methods allowed
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Allowed headers
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/auth', userRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
