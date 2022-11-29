"use strict";
const passport=require("passport");
const Strategy=require("passport-local").Strategy;
const { getUserLogin }=require("../models/userModel");
const passportJWT=require("passport-jwt");
const JWTStrategy=passportJWT.Strategy;
const ExtractJWT=passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(
    new Strategy(async (username, password, done) => {
        const params=[username];
        try {
            const [user]=await getUserLogin(params);
            console.log("Local strategy", user); // result is binary row
            if (user===undefined) {
                return done(null, false, { message: "Incorrect email." });
            }
            if (user.password!==password) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, { ...user }, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTY1NzIxNywiaWF0IjoxNjY5NjU3MjE3fQ.Ml7gOSMeXHSWr8zc4IE9MC8FMINxV34bWFGT0EUm0qA'
},
    function (jwtPayload, done) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET

module.exports=passport;