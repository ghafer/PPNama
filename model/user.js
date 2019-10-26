const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const userSchema = new mongoose.Schema({
    username : {
        type: String, required: true,unique:true
    },
    firstname:{
        type : String,
        required:true
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

const User = mongoose.model('user',userSchema);

function validateUser(user){
    const schema = {
        username:Joi.string().required(),
        firstname:Joi.string().required(),
        lastname:Joi.string().required(),
        password:Joi.string().required(),
        role:Joi.string().required(),
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate=validateUser;