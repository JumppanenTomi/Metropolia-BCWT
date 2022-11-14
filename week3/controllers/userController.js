'use strict';
const userModel=require('../models/userModel');

const getUsers=async (req, res) => {
    const users=await userModel.getAllUsers(res);
    res.json(users);
};

const getUser=async (req, res) => {
    // choose only one object with matching id
    const user=await userModel.getUserById(req.params.userId, res);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const createUser=async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUser=req.body;
    const result=await userModel.addUser(newUser, res);
    res.status(201).json({ userId: result });
};

const modifyUser=(req, res) => {
    // TODO: add functionality & data model 
};
const deleteUser=(req, res) => {
    // TODO: add functionality & data model 
};

module.exports={
    getUser,
    getUsers,
    modifyUser,
    createUser,
    deleteUser
};