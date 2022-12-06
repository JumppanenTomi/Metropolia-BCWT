'use strict';
const { rawListeners }=require('../database/db');
const catModel=require('../models/catModel');
const image=require('../utils/image');

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
    const cat=req.body;
    cat.filename=req.file.filename;
    console.log('creating a new cat:', cat);
    try {
        image.makeThumbnail(req.file.path, req.file.filename);
        const coords=await image.getCoordinates(req.file.path);
        // add to db
        const params=[
            req.body.name,
            req.body.birthdate,
            req.body.weight,
            2,//req.body.owner,
            req.file.filename,
            coords
        ];
        const cat=await catModel.addCat(params, res);
        await res.json({ message: 'upload ok' });
    }
    catch (e) {
        console.log('exif error', e);
        res.status(400).json({ message: 'error' });
    }
};

const modifyCat=async (req, res) => {
    const cat=req.body;
    console.log(req.params.id)
    if (req.params.id) {
        cat.id=req.params.id;
    }
    const result=await catModel.updateCatById(cat, res);
    if (result.affectedRows>0) {
        res.json({ message: 'cat modified: '+cat.id });
    } else {
        res.status(404).json({ message: 'nothing changed' });
    }
};

const deleteCat=async (req, res) => {
    console.log("dfsa "+req.params.id)
    const result=await catModel.deleteCatById(req.params.id, res);
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