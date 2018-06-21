'use strict';

import express from 'express';
import router from './api/api.js';

const app = express();

app.use(router);

module.exports = {

  start: port => app.listen(port, console.log('Listening on PORT', port)),
  server: app,
};