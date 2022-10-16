require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log('error', e);
  }
};

start();
