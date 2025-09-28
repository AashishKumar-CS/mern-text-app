const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern-text-app-db')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));