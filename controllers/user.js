/**
 * Created by drodriguez on 13/10/17.
 */
'use strict'
var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({message: 'Probando una accion del controlador user'});
}

function saveUser(req,res){
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image= 'null';
    if(params.password){
        bcrypt.hash(params.password,null,null, (err,hash) => {
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                user.save((err,userStored) => {
                    if (err){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    } else {
                        if(!userStored){
                            res.status(500).send({message: 'No se ha registrado el usuario'});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    }
                })
                // guardar usuario
            } else {
                res.status(500).send({message: 'Faltan datos'});
            }
        })
        //encriptar contraseña
    } else {
        res.status(500).send({message: 'Debe ingresar un password'});
    }
}

function loginUser(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err,user) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            } else {
                bcrypt.compare(password,user.password, (err,check) => {
                    if(check){

                        if(params.gethash){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(500).send({message: 'El usuario no pudo loguearse'});
                    }
                });
            }
        }
    });
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId,update,(err,userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se pudo actualizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req,res){
    var userId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];
        if(file_ext == 'png' || file_ext == 'jpg'){
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                if(!userUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                } else {
                    res.status(200).send({image: file_name, user: userUpdated});
                }
            });
        } else {
            res.status(200).send({message: 'Extension del archivo no valida'});
        }
    } else {
        res.status(500).send({message: 'No has subido ninguna imagen.'});
    }
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;
    fs.exists(path_file, (exists) => {
        if(exists){
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({message: 'No existe la imagen'});
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};
