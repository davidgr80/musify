/**
 * Created by drodriguez on 04/11/17.
 */
'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/albums'});

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getArtist);
api.post('/album', md_auth.ensureAuth, AlbumController.saveArtist);
api.get('/albums/:page?', md_auth.ensureAuth, AlbumController.getArtists);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateArtist);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteArtist);
api.post('/upload-image-album/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
api.get('/get-image-album/:imageFile', AlbumController.getImageFile);

module.exports = api;
