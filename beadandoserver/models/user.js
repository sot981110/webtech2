const mongoose = require('mongoose');

var User = mongoose.model('User', {
    userName: {type:String, required:true, unique:true},
    password:{type:String, required:true}
})

module.exports = {User};