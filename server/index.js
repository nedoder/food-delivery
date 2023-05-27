/* eslint-disable no-console */
require('dotenv').config({ path: `${__dirname}/.env` });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.static('uploads'));

// eslint-disable-next-line no-underscore-dangle
global.__basedir = __dirname;

// change in production to specified origin
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

// Middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Json Body Middleware
app.use(bodyParser.json());

// routes
require('./routes/user.routes')(app);
require('./routes/roles.routes')(app);
require('./routes/food.routes')(app);
require('./routes/restaurant.routes')(app);
require('./routes/order.routes')(app);
require('./routes/rating.routes')(app);
require('./routes/comment.routes')(app);

// port where app is served
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('The web server has started on port 3000');
});
