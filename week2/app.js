'use strict';
const express=require('express');
const catRoutes=require('./routes/catRoutes.js')
const userRoutes=require('./routes/userRoutes.js')
const passport=require("./utils/passport");
const authRoute=require("./routes/authRoute");
const app=express();
const cors=require('cors')
const port=3000;

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', { session: false }), catRoutes)
app.use('/user', passport.authenticate('jwt', { session: false }), userRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
