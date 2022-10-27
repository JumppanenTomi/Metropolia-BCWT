'use strict';
const express=require('express');
const pug=require('pug');
const app=express();
const port=3000;

app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.send(pug.renderFile('views/template.pug'))
});

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