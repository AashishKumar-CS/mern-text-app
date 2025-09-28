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

// Global error handler
//app.use((err, req, res, next) => {
  //console.error(err.stack);
  //res.status(500).send('Internal server error');
//});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));