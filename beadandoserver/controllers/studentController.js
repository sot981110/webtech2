const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Student} = require('../models/student');

router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            console.log("Hiba az adatok elérésében. " + JSON.stringify(err));
        }
    })
})

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Nincs ilyen rekord. " + req.params.id);
    }
    
    Student.findById(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log("Hiba a tanuló elérése közben. " + JSON.stringify(err));
        }
    })
})

router.post('/new', (req, res) => {
    var st = new Student({
        name : req.body.name,
        department : req.body.department,
        currentTerm: req.body.currentTerm,
        admissionYear : req.body.admissionYear
    })
    st.save((err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log("Nem adminisztrálható fájl. " + JSON.stringify(err));
            res.send(null);
        }
    });
})

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send("Nincs ilyen rekord. " + req.params.id);
    }

    var st = {
        name : req.body.name,
        department : req.body.department,
        currentTerm: req.body.currentTerm,
        admissionYear : req.body.admissionYear
    }
    Student.findByIdAndUpdate(req.params.id, {$set : st}, {new:true}, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log("Nem adminisztrálható fájl. " + JSON.stringify(err));
            res.send(null);
        }
    });
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send("Nincs ilyen rekord. " + req.params.id);
    }

    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log("Nem adminisztrálható fájl. " + JSON.stringify(err));
            res.send(null);
        }
    });
})



module.exports = router;