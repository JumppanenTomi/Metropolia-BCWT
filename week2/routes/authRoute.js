'use strict';
const express=require('express');
const router=express.Router();
const { body }=require('express-validator');
const authController=require('../controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post(
    '/register',
    body('name').isLength({ min: 3 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('passwd').isLength({ min: 8 }).trim(),
    authController.register
);

module.exports=router;