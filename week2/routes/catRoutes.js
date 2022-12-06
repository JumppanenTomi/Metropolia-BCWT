"use strict";
// catRoute

const express=require('express');
const { body }=require('express-validator');
const multer=require('multer');
const catController=require('../controllers/catController');
const router=express.Router();

const fileFilter=(req, file, cb) => {
    if (!file.mimetype.includes('image')) {
        return cb(null, false, new Error('not an image'));
    } else {
        cb(null, true);
    }
};

const upload=multer({ dest: 'uploads/', fileFilter });

const injectFile=(req, res, next) => {
    if (req.file) {
        req.body.type=req.file.mimetype;
    }
    console.log('inject', req.body);
    next();
};

router.get("/", catController.getCats);
router.post('/',
    upload.single('cat'),
    injectFile,
    [
        body('name', 'cannot be empty').isLength({ min: 1 }),
        body('age', 'must be a number').isLength({ min: 1 }).isNumeric(),
        body('weight', 'must be a number').isLength({ min: 1 }).isNumeric(),
        body('owner', 'required').isLength({ min: 1 }).isNumeric(),
        body('type', 'not image').contains('image'),
    ],
    catController.createCat);
router.get("/:id", catController.getCat);
router.put('/',
    [
        body('name', 'cannot be empty').isLength({ min: 1 }),
        body('age', 'must be a number').isLength({ min: 1 }).isNumeric(),
        body('weight', 'must be a number').isLength({ min: 1 }).isNumeric(),
        body('owner', 'required').isLength({ min: 1 }).isNumeric(),
    ],
    catController.modifyCat);
router.delete('/:id', catController.deleteCat);

module.exports=router;
