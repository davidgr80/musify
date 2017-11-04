/**
 * Created by drodriguez on 04/11/17.
 */
'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req,res){
    var albumId = req.params.id;
    Album.findById(albumId, (err,album) => {
        if(err){
            res.status(500).send({message: 'Error en la consulta'});
        } else {
            if(!album){
                res.status(404).send({message: 'El artista no existe'});
            } else {
                res.status(200).send(album);
            }
        }
    });
}

