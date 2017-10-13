/**
 * Created by drodriguez on 13/10/17.
 */
'use strict'
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

function pruebas(req, res){
    res.status(200).send({message: 'Probando una accion del controlador user'});
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;
}

module.exports = {
    pruebas
};
