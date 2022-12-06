'use strict';
const jwt=require('jsonwebtoken');
const passport=require('passport');
const { validationResult }=require('express-validator');
const userModel=require('../models/userModel')
var bcrypt=require('bcryptjs');
var salt=bcrypt.genSaltSync(10);

const login=(req, res) => {
    // TODO: add passport authenticate
    console.log('authController login', req.body);
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('authController authenticate', user);
        if (err||!user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token=jwt.sign(user, 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
};

const register=async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors=validationResult(req); // TODO require validationResult, see userController

    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        // TODO: use bcrypt for creatign a password hash
        const params=[
            req.body.name,
            req.body.username,
            // TODO: save the hash instead of the actual password
            req.body.passwd=bcrypt.hashSync(String(req.body.passwd), salt)
        ];

        const result=await userModel.addUser(req, params);
        if (result.insertId) {
            res.json({ message: `User added`, user_id: result.insertId });
        } else {
            res.status(400).json({ error: 'register error' });
        }
    }
};

const logout=(req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.json({ message: 'logout' });
    });
};

module.exports={ login, register, logout };