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

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));