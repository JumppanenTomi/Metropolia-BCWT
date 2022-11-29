"use strict";
const jwt=require("jsonwebtoken");
const passport=require("passport");

const login=(req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
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
            const token=jwt.sign(user, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTY1NzIxNywiaWF0IjoxNjY5NjU3MjE3fQ.Ml7gOSMeXHSWr8zc4IE9MC8FMINxV34bWFGT0EUm0qA');
            return res.json({ user, token });
        });
    })(req, res);
};

module.exports={
    login
};