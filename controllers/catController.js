'use strict';
const { validationResult }=require('express-validator');
const { rawListeners }=require('../database/db');
const catModel=require('../models/catModel');

const getCats=async (req, res) => {
    const cats=await catModel.getAllCats(res);
    res.json(cats);
};

const getCat=async (req, res) => {
    // choose only one object with matching id
    const cat=await catModel.getCatById(res, req.params.catId);
    if (cat) {
        res.json(cat);
    } else {
        res.sendStatus(404);
    }
};

const createCat=async (req, res) => {
    const error=validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    } else {
        const cat=req.body;
        cat.filename=req.file.filename;
        console.log('creating a new cat:', cat);
        const catId=await catModel.addCat(cat, res);
        res.status(201).json({ catId });
    }
};

const modifyCat=async (req, res) => {
    const cat=req.body;
    const error=validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    } else {
        if (req.params.catId) {
            cat.id=req.params.catId;
        }
        const result=await catModel.updateCatById(cat, res);
        if (result.affectedRows>0) {
            res.json({ message: 'cat modified: '+cat.id });
        } else {
            res.status(404).json({ message: 'nothing changed' });
        }
    }
};

const deleteCat=async (req, res) => {
    const result=await catModel.deleteCatById(req.params.catId, res);
    console.log('cat deleted', result)
    if (result.affectedRows>0) {
        res.json({ message: 'cat deleted' });
    } else {
        res.status(404).json({ message: 'cat was already deleted' });
    }
};

module.exports={
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat
};