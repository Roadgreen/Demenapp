var express = require('express')
var cors = require('cors')
var app = express()
var router = express.Router();
const userRoute = require('./routes/user.routes')
const clientRoute = require('./routes/client.routes')
require('./config/db');


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

app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 80')
  })