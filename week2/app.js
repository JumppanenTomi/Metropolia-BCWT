'use strict';
const express=require('express');
const catRoutes=require('./routes/catRoutes.js')
const userRoutes=require('./routes/userRoutes.js')
const app=express();
const port=3000;

app.use('/cat', catRoutes)
app.use('/user', userRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
