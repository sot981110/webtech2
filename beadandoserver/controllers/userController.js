const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {User} = require('../models/user');

router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if(!err){
            var result = [];
            for (let i = 0; i < docs.length; i++) {
                result[i] = {_id:docs[i].id, userName:docs[i].userName};
            }
            res.send(result);
        }
        else{
            console.log("Hiba az adatok elérésében. " + JSON.stringify(err));
            res.send(null);
        }
    })
})

router.post('/login', (req, res) => {

    User.findOne( {userName : req.body.userName}, (err, doc) => {
        if(!err && doc != null){
            if(req.body.password == doc.password){
                res.send({authenticated:true});
            }
            else{
                res.send({authenticated:false});
            }
        }
        else{
            console.log("Hiba a felhasználó elérése közben. " + JSON.stringify(err));
            res.status(404).send("Nem található a felhasználó");
        }
    })
})

router.post('/register', (req, res) => {
    var user = new User({
        userName : req.body.userName,
        password : req.body.password
    })
    user.save((err,doc) => {
        if(!err){
            res.send({registered:true});
        }
        else{
            res.send({registered:false});
            console.log("Nem adminisztrálható fájl. " + JSON.stringify(err));
        }
    });
})

router.put('/newPassword', (req, res) => {
    var user = {
        userName : req.body.userName,
        password : req.body.newPassword
    }

    User.findOneAndUpdate( {userName : req.body.userName, password : req.body.password}, {$set : user}, {new : true}, (err, doc) => {
        if(!err && doc != null){ 
            res.send(doc);
        }
        else{
            console.log("Hiba a felhasználó elérése közben. " + JSON.stringify(err));
            res.status(404).send("Nem található a felhasználó");
        }
    })
})

router.delete('/:name',(req, res) => {
    User.findOneAndRemove( {userName : req.params.name}, (err, doc) => {
        if(!err && doc != null){
            res.send(doc);
        }
        else{
            console.log("Hiba a felhasználó elérése közben. " + JSON.stringify(err));
            res.status(404).send("Nem található a felhasználó");
        }
    })
})

module.exports = router;