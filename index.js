// implement your API here
const express = require('express');

//import database
const db = require('./data/db.js');

const server = express();

//middleware that parses request body if it is json  when making post requests
server.use(express.json());


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


  //posts a new users to database
  server.post('/api/users', (req, res) => {

      const {name, bio} = req.body;

      if(!name || !bio){
          res.status(400).json({errorMessage: "Please provide a name and bio"})
      } else {
          db.insert(req.body)
          .then(user => {
              res.status(201).json(user)
          })
          .catch(()=>{
              res.status(500).json({errorMessage: "There was an error while saving the user"})
          })
      }
  })
  

//deletes an user from database
  server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
      .then(count => {
        if (count && count > 0) {
          res.status(200).json({
            message: 'the user was deleted.',
          });
        } else {
          res.status(404).json({ message: 'The user with the specified ID does not exist.' });
        }
      })
      .catch(() => {
        res.status(500).json({ errorMessage: 'The user could not be removed' });
      });
  });




//updates user from database
  server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
  
    if (!name || !bio) {
      res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
      db.update(req.params.id, req.body)
        .then(user => {
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'});
          }
        })
        .catch(() => {
          res.status(500).json({
            errorMessage: 'The user information could not be modified.',
          });
        });
    }
  });




server.listen(8000, () => {
    console.log("API Running on port 8000")
})