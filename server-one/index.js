'use strict';
const express=require('express');
const app=express();
const port=3000;

/** I'm not sure that should i keep this or no so I just comment out this and replace root path request with cat website
app.get('/', (req, res) => {
    res.send('Hello World!')
});*/

app.use('/', express.static('public'));

app.get("/catinfo", (req, res) => {
    const cat={
        name: "Frank",
        birthdate: "2010-12-25",
        weight: 5,
    };
    res.json(cat);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});