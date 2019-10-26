const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    
    username : {
        type: String
    },
    firstname:{

        type : String

    },
    lastname:{
        type : String
   
    },
    password:{
        type : String
            },
    role:{
        type : String

    }
},{
    timestamps : true
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('user',userSchema);

exports.User = User;
