const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    name : {type:String, required:true},
    department : {type:String, required:true},
    currentTerm: {type:Number},
    admissionYear : {type:Number, required:true}
})

module.exports = {Student};