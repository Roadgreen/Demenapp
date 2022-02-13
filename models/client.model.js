const  mongoose = require('mongoose');
  const { Schema } = mongoose;

  const clientSchema = new Schema({
  email:{
          required: true,
          type: String,
      },
      nom:{
          required: true,
          type: String,
      },
      prenom:{
          required: true,
          type: String
      },
      tel:{
        type:Number
      },
     adresse:{
          ville:{
              type: String
          },
          numero:{
              type: Number,
          },
          rue:{
              type: String
          },
          postalCode:{
              type: Number
          }
      },
      gainPotentiel:{
        type: Number 
      },
      gain:{
        type: Number 
      },
      state: {
          type: String
      },
      idAgent: {
type: String
      },
      date:{
          type: Date
      },
      genre: {
          type: String
      }
      
  })

  const Client = mongoose.model('Client', clientSchema);
  module.exports = Client;
