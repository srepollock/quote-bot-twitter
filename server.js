const logger = require('de-loggingsystem');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes.js');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

var server = app.listen(port, () => {
    logger.log(logger.LogLevel.info, `Running at http://localhost:${port}`);
});
