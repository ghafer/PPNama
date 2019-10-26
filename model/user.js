const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    
    username : {
        type: String, required: true,unique:true
    },
    firstname:{

        type : String,
        required:true,unique
    },
    lastname:{
        type : String,
        required:true,
    },
    password:{
        type : String,
        required:true,
    },
    role:{
        type : String,
        required:true,
    }
},{
    timestamps : true
});
userSchema.plugin(uniqueValidator);

export const User = mongoose.model('user',userSchema);

// exports.User = User;
