'use strict';
// Controller
"use strict";
const catModel=require("../models/catModel");

const cats=catModel.cats;

const cat_list_get=(req, res) => {
    res.json(cats);
};

const cat_get=(req, res) => {
    res.json(cats.filter(cat => cat.id==req.params.id));
};

const createCat=(res, req) => {
    res.json("file received")
};

module.exports={
    cat_list_get, cat_get, createCat
};