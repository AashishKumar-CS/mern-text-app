const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mern-user:mernpass123@test.jazmdis.mongodb.net/?retryWrites=true&w=majority&appName=Test')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));