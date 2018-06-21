'use strict';

require('dotenv').config();

require('babel-register');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const app = require('./src/app.js');

app.start(process.env.PORT);