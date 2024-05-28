const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3002;
const db = require('./db');
const snacksRouter = require('./routes/snacks');
const seed = require('./seed');
seed.createAdminUser();
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use('/api', snacksRouter);
app.get('/', (req, res) => {
  res.send('Moonsnacks Backend Server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
