const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const cors       = require('cors');

const errorHandler               = require('./utils/errorHandler');
const error404Handler            = require('./utils/error404Handler');
const responseFormatter          = require('./utils/responseFormatter');
const {publicApi, api} = require('./routes');

const FRONTEND  = path.resolve('frontend');

const app = express();

app.use(cors());

//set up static files directory
app.use('/swagger', express.static(path.join(FRONTEND, 'swagger')));
app.use(responseFormatter);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);
app.use('/', publicApi);

app.use(error404Handler);
app.use(errorHandler);

module.exports = app;
