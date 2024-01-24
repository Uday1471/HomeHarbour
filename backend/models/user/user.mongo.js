const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default: null,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
}, {
    timestamps: true, 
  })

const user = mongoose.model('users',userSchema);
module.exports = user;