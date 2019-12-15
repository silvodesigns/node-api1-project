// implement your API here
const express = require('express');

//import database
const db = require('./data/db.js');

const server = express();

//EndPoints


//returns all users
server.get('/api/users', (req, res) => {
  db.find()
  .then(users => {
      res.status(200).json(users);
  })
  .catch(()=>{
      res.status(500).json({
          errorMessage: 'The users information could not be retrieved'
      })
  })
})


server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(()=>{
        res.status(500).json({
            errorMessage: 'The users information could not be retrieved'
        })
    })
  })
  





server.listen(8000, () => {
    console.log("API Running on port 8000")
})