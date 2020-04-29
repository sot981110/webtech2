const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/beadando', (err) => {
    if(!err){
        console.log("Adatbázis csatlakoztatva.");
    }
    else{
        console.log("Adatbázis hiba.");
    }
})

const dbName = "beadando";

module.exports = mongoose;

