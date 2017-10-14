/**
 * Created by drodriguez on 14/10/17.
 */
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clavesecreta';

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
    }else{
        var token = req.headers.authorization.replace(/['"]+/g,'');
        try{
            var payload = jwt.decode(token,secret);
            if(payload.exp <= moment().unix()){
                return res.status(401).send({message: 'El Token ha expirado'});
            }
        }catch(ex){
            console.log(ex);
            return res.status(404).send({message: 'Token no valido'});
        }
        req.user = payload;
        next();
    }
};