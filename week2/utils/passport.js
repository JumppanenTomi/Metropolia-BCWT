'use strict';
const passport=require('passport');
const Strategy=require('passport-local').Strategy;
const passportJWT=require("passport-jwt");
const JWTStrategy=passportJWT.Strategy;
const ExtractJWT=passportJWT.ExtractJwt;
const userModel=require('../models/userModel');
const bcrypt=require('bcryptjs');

passport.use(new Strategy(
    async (username, password, done) => {
        const params=[username];
        try {
            const [user]=await userModel.getUserLogin(params);
            console.log('Local strategy', user);
            if (user===undefined) {
                return done(null, false, { message: 'Incorrect Credentials.' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                console.log('here');
                return done(null, false);
            }

            return done(null, { ...user }, { message: 'Logged In Successfully' });
        } catch (err) {
            return done(err);
        }
    }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    async (jwtPayload, done) => {
        try {
            console.log('util pass JWT', jwtPayload);
            if (jwtPayload===undefined) {
                return done(null, false, { message: 'Incorrect Id.' })
            }
            return done(null, { ...jwtPayload }, { message: 'Some job to do here after coffee break' });
        } catch (err) {
            return done(err);
        }
    }
));


module.exports=passport;
