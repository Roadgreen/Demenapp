const mongoose = require('mongoose');
require('dotenv').config();



mongoose.connect("mongodb+srv://Admin:" + process.env.DB_PASS + "@cluster0.ozzhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoconnected');
});