const express = require('express');
const cors = require('cors');
const formidable = require('express-formidable');
const contactRoutes = require('./routes/contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(formidable()); // ✅ Handles form-data

app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio backend running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
