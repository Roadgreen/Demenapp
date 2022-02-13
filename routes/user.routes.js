const Router = require('express').Router();
const express = require('express');
const auth = require('../controller/auth.controller');
var jwt = require('jsonwebtoken');
require('dotenv').config()




Router.post('/register', auth.signUp);
Router.post('/login', auth.signIn);
Router.get('/isAuth', auth.isAuth);
Router.get('/notif', auth.notif);
Router.get('/info', auth.info);
Router.post('/delete', auth.delete);
Router.get('/validate', auth.validate);
Router.post('/userInfo',auth.userInfo);
Router.post('/postimgAdmin', auth.postimgAdmin)
Router.get('/imgGet', auth.imgGet)
module.exports = Router;