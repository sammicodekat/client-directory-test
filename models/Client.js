const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
  name:{
    first: { type: String, required : true},
    last: { type: String, required : true }
  },
  age: { type: Number, min: 0, max: 120 },
  allergies: [ {type: String, maxlength: 100} ],
  gender: { type: String, enum: ['male', 'female']},
  lastVisit:{ type: Date,  max: Date.now }
})

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
