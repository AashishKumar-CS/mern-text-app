const express = require('express');
const cors = require('cors');
require('./db');

const app = express();
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url, req.headers, req.body);
  next();
});
app.use(express.json()); // Must be before any routes
app.use(cors({ origin: 'http://localhost:3000' }));

const textRoutes = require('./routes/textRoutes');
app.use('/api/texts', textRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));