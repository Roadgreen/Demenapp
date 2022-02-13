const Router = require('express').Router();
const express = require('express');
const client = require('../controller/client.controller');

require('dotenv').config()




Router.post('/create', client.create);
Router.get('/search', client.search);
Router.get('/gain', client.gain);
Router.get('/info', client.info);
Router.get('/delete', client.delete);
Router.get('/editSearch', client.editSearch);
Router.post('/editSubmit',client.editSubmit);


module.exports = Router;