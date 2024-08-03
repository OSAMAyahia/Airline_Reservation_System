const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    role:{
      type: String
      ,
      enum:["admin","Passenger"],
      default :"Passenger",
      

    }
  })  
 
const User=mongoose.model("Passenger",UserSchema)

module.exports=User;  