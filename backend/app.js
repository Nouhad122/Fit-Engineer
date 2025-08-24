const path = require('path');

// Load environment variables (dotenv not needed in production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

const express = require('express');
const clientsRoutes = require('./routes/clients-routes');
const reviewsRoutes = require('./routes/reviews-routes');
const authRoutes = require('./routes/auth-routes');
const transformationsRoutes = require('./routes/transformations-routes');
const uploadRoutes = require('./routes/upload-routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: [
    'https://www.fit-engineer.net',
    'http://localhost:5173' // Keep for local development
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/clients-forms', clientsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/transformations', transformationsRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from public/uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });