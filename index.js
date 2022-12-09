var express = require('express')
var cors = require('cors')
var app = express()
var router = express.Router();
const userRoute = require('./routes/user.routes')
const clientRoute = require('./routes/client.routes')
require('./config/db');
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


 //cors policy
app.use(cors())

//User Route
app.use('/api/user', userRoute);
//Fiche Client Route
app.use('/client', clientRoute)

app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('*', (_,res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.listen(PORT, function () {
    console.log('CORS-enabled web server listening on port 80')
  })