'use strict';
// Controller
"use strict";
const userModel=require("../models/userModel");

const users=userModel.users;

const user_list_get=(req, res) => {
    res.json(users);
};

const user_get=(req, res) => {
    res.json(users.filter(user => user.id==req.params.id));
};

const user_post=(req, res, next) => {
    console.log(req.body)
    res.json(req.body)
}

const checkToken=(req, res) => {
    res.json({ user: req.user });
};

module.exports={
    user_list_get, user_get, user_post
};