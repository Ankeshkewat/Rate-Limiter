const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    ip:String,
    rem:{type:Number,default:9},
    time:Number
})

const UserModel=mongoose.model('users',Schema);

module.exports={UserModel}