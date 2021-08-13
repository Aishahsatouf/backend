const express = require('express');
const cors = require('cors');
// const morgan=require('morgan')

const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
const authRoutes = require('./routes/authapi');
const restRoutes = require('./routes/restapi');

const app = express();

// app.use(morgan)
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(restRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};