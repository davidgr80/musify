/**
 * Created by drodriguez on 13/10/17.
 */
'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/probando', UserController.pruebas);

module.exports = api;
