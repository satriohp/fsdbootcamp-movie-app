require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
  });
} else {
  app.listen(port);
}

module.exports = app;