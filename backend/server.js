import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import analysisRoutes from './routes/analysisRoutes.js';
import securityRoutes from './routes/securityRoutes.js';
import UserRouter from './routes/User.js';
import FeedbackRouter from './routes/Feedbak.js'; // Make sure the route name matches
import errorHandler from './middlewares/errorMiddleware.js';
import notFound from './middlewares/notFoundMiddleware.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config();
connectDB();

const app = express();

// Apply CORS middleware before routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend origin
  credentials: true, // Allow cookies or other credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
}));

// Enable JSON parsing for incoming requests
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Define routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/security', securityRoutes);
app.use('/auth', UserRouter);
app.use('/API', FeedbackRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
