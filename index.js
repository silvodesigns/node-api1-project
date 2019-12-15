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


//returns user with a specific ID
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(users => {
        if(users){
            res.status(200).json(users);
        } else {
            res.status(404).json({message: "The user with given id does not exist"})
        }
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