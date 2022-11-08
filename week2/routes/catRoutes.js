// Router
"use strict";
const express=require("express");
const router=express.Router();
const catController=require("../controllers/catController");
const multer=require('multer')
const upload=multer({ dest: 'uploads/' })

router.get("/", catController.cat_list_get);

router.get("/:id", catController.cat_get);

router.post('/', upload.array('file', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})

module.exports=router;