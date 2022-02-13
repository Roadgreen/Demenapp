const  mongoose = require('mongoose');
  const { Schema } = mongoose;

  const userSchema = new Schema({
    username:{
        required: true,
        type: String
    } ,
    email:{
          required: true,
          type: String,
      },
      tel:{
          type: String,
      },
      mdp:{
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
      salarié:{
          type: Boolean,
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
      payment:{
          Rib:{
              type: String
          },
          Cheque:{
              type: Boolean
          }
      },
      notification: [[]],
      creationDate: {type: Date},
      isOk: {
          type: Boolean
      },
      imgBig: { type: String},
      imgSmall: { type: String}
      
  })

  const User = mongoose.model('User', userSchema);
  module.exports = User;
