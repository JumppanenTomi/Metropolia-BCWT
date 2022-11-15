'use strict';
const express=require('express');
const app=express();
const port=3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie:clr', (req, res) => {
  res.cookie("color", clr)
});

app.get('/getCooki', (req, res) => {
  res.cookie("color", clr)
});

app.get('/deleteCookie', (req, res) => {
  res.render('home');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
