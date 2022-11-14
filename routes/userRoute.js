
'use strict';
const express=require('express');
const router=express.Router();
const { body, validationResult }=require('express-validator')


const userController=require('../controllers/userController');

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser);

router.post('/',
    body('email').isEmail().normalizeEmail(),
    body('name').notEmpty().isLength({ min: 3 }).trim().escape(),
    body('passwd').isLength({ min: 8 }).matches(/[A-Z]/),
    userController.createUser);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit users.');
});
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete users.');
});

module.exports=router