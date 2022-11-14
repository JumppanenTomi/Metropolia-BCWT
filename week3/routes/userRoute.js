
'use strict';
const express=require('express');
const router=express.Router()

const userController=require('../controllers/userController');

// TODO: chain the router method calls
router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser);

router.post('/', userController.createUser);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit users.');
    // TODO: replace with controller & data model
});
router.delete('/', (req, res) => {
    // TODO: replace with controller & data model 
    res.send('From this endpoint you can delete users.');
});

module.exports=router