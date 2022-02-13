const  mongoose = require('mongoose');
  const { Schema } = mongoose;

  const notifSchema = new Schema({
    createdAt: { type: Date, expireAfterSeconds: 3, default: Date.now },
    userId: {
        type: String
    },
    text:{
        type: String
    }
    
  })

  const Notif = mongoose.model('Notif', notifSchema);
  module.exports = Notif;
