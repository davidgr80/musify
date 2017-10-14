/**
 * Created by drodriguez on 13/10/17.
 */
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/musify', { useMongoClient: true }, (err, res) => {
    if(err){
        throw err;
    } else {
        console.log("Se ha conectado a la base de datos");
        app.listen(port, () => {
            console.log('El servidor esta corriendo en: http://localhost:' + port);
        })
    }
});