const express = require('express');
const moment = require('moment');
const router = express.Router();

const Client = require('../models/Client');

router.route('/')
.get( (req,res) => {
  let query = Client.find();
  if(req.query.gender){
    query.where('gender').equals(req.query.gender)
  }
  if(req.query.minage){
    query.where('age').gt(req.query.minage)
  }
  if(req.query.maxage){
    query.where('age').lt(req.query.maxage)
  }
  if(req.query.allergies){
    query.where('allergies').equals(req.query.allergies)
  }
  if(req.query.visitafter){
    query.where('lastVisit').gt(req.query.visitafter)
  }
  if(req.query.visitbefore){
    query.where('lastVisit').lt(req.query.visitbefore)
  }
  if (req.query.page || req.query.pagesize){
    const pagesize = req.query.pagesize || 20 ;
    const page = req.query.page || 1 ;
    skip(page*pagesize).limit(pagesize)
  }

  query
  .then(users => res.send(users))
  .catch( err => res.status(400).send(err))
})
.post((req,res) => {
  Client.create(req.body)
  .then( user => res.send(user))
  .catch( err => res.status(400).send(err))
})

router.route('/:id')
.get((req, res) => {
  const { id } = req.params;
  Client.findById(id)
  .then(client => res.send(client))
  .catch(err => res.status(400).send(err));
})
.put((req, res) => {
  Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
   .then(newClient => res.send(newClient))
   .catch(err => res.status(400).send(err))
})
 .delete((req, res) => {
   Client.findByIdAndRemove(req.params.id)
   .then(() => {
     res.send('removed!');
   })
   .catch(err => res.status(400).send(err))
 });

module.exports = router;
