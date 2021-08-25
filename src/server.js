
'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


//v2 route

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./routes/routes');
const logger = require('./middleware/logger.js');



const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Routes

app.use(authRoutes);



app.get('/',(req,res)=>{
  res.send('this is the home page')
})



app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};