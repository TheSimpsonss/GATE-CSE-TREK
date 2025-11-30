const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (don't block server startup)
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gate-cse-trek';
console.log('🔌 Attempting to connect to MongoDB...');
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️  Server will continue but API may not work properly');
  });

// Load routes with error handling
let authRoutes, syllabusRoutes, testRoutes;
try {
  authRoutes = require('./routes/authRoutes');
  syllabusRoutes = require('./routes/syllabusRoutes');
  testRoutes = require('./routes/testRoutes');
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error);
  process.exit(1);
}

app.use('/api/auth', authRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/tests', testRoutes);
console.log('✅ Routes registered');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
  });
});

// Test auth route endpoint
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});