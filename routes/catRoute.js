'use strict';
// catRoutes
const express=require('express');
const router=express.Router()
const multer=require('multer');
const catController=require('../controllers/catController');
const { body, validationResult }=require('express-validator')

const upload=multer({ dest: 'uploads/' });

router.get('/', catController.getCats)

router.get('/:catId', catController.getCat)

router.post('/',
    upload.single('cat'),
    body('name').notEmpty,
    body('Birthdate').isDate().notEmpty(),
    body('weight').isNumeric().notEmpty(),
    body('owner').notEmpty(),
    catController.createCat)

router.put('/',
    body('name').notEmpty,
    body('Birthdate').isDate().notEmpty(),
    body('weight').isNumeric().notEmpty(),
    body('owner').notEmpty(),
    catController.modifyCat)

router.put('/:catId', catController.modifyCat)

router.delete('/:catId', catController.deleteCat);

module.exports=router;