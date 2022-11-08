'use strict';
const express=require('express');
const catRoutes=require('./routes/catRoutes.js')
const userRoutes=require('./routes/userRoutes.js')
const app=express();
const cors=require('cors')
const port=3000;

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/cat', catRoutes)
app.use('/user', userRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
