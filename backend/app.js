const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = require('./util/port').PORT;
const LOGGER = require('./util/logger');
const logger = require('morgan');
const host = 'localhost';
const sequelize = require('./dbConnect');

//require routes
const products = require('./routes/products');
const inventory = require('./routes/inventory');
var cors = require('cors')


app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Header Setup ///////////////////
app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin , X-Requested-With , Content-Type , Accept , Authorization"
    );
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", 'PUT , POST , PATCH , DELETE , GET, OPTION');
      return res.status(200).json({});
    }
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    next();
  });

//forward to routes
app.use('/products', products);
app.use('/inventory', inventory);

//Error Handlers    ///////////
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      Error: {
        message: error.message
      }
    });
  });
  ///////////////////////////////////

app.listen(PORT , (error) => {
    if(error) return LOGGER.error(error.meesage);
    LOGGER.appStarted(PORT ,host);
    // console.log(`Started process ${pid}`);
})