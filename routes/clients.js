const express = require('express');
const router = express.Router();

const User = require('../models/Client');

router.route('/')
.get( (req,res) => {
  let query = Client.find();
  if (req.query.sort) {
    query.sort(req.query.sort)
  }
  if (req.query.limit){
    query.limit(req.query.limit)
  }
  // if (req.query.page){
  //   skip(page*pagesize).limit(pagesize)
  // }
  //let {page} = req.query
  //skip(10) skip the first 10 pagination
  // .sort('-name.last')  sortby lastname desending
  // .limit(5)
  //.select({
//   age:true,
//   gender:true,
//   _id:false
// }) return only certain fields
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
