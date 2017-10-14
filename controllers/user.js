/**
 * Created by drodriguez on 13/10/17.
 */
'use strict'
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

module.exports = {
    pruebas,
    saveUser,
    loginUser
};
