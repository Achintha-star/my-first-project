const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema(
    { firstname:{ type : String,
                  required : true},
                  
      lastname:{ type : String,
                 required : true},
    
      email :  { type: String,
              required : true },
      
      password : { type : String,
                   required : true},
      
      
      status: { type: Boolean,
                default : true},
    
      lastseen : { type : Date
                  // required : true  
                  } 
                
      },

  
      { timestamps : true,
        toObject:{ virtuals : true },
        toJSON : { virtuals : true} 

      } );

      module.exports = mongoose.model("User", UserSchema);