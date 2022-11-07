'use strict';
const express=require('express');
const app=express();
const port=3000;

app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

app.get('/cat/:id', (req, res) => {
  res.send('From this endpoint you can get cats. '+req.params.id)
});

app.post('/cat/add', (req, res) => {
  res.send('Here u add cats')
})

app.put('/cat/edit', (req, res) => {
  res.send('Here u modify cats')
})

app.delete('/cat/delete', (req, res) => {
  res.send('Here u terminate cats')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
