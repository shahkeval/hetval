require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const dayRoutes = require('./routes/days');
const messageRoutes = require('./routes/messages');
const audioMessageRoutes = require('./routes/audioMessages');
const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');
const { startCronJobs } = require('./cron/startCronJobs');

const app = express();

// Basic config
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/valentine_week';

// Middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Simple request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use('/api/days', dayRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/messages/audio', audioMessageRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Root + health check (handy for Vercel / uptime checks)
app.get('/', (_req, res) => {
  res.json({ status: 'ok', endpoint: 'root', time: new Date().toISOString() });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', endpoint: 'health', time: new Date().toISOString() });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Error handler caught:', err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Something went wrong. Please try again.' });
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Start cron jobs only after DB is ready
    startCronJobs();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

