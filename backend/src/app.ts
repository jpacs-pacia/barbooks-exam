// Configuration
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import orderRoutes from './routes/orders.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});



app.use('/api', orderRoutes);

// Temporary test route
app.get('/', (_req, res) => {
  res.send('Barbooks API is running successfully!');
});

export default app;
