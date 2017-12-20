const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
  destination: { type: String, required: true },
  climate: { type: String,},
  dates: { type: String,},
  kid_friendly: {type: Boolean},
  description: String,
  img: String
});

module.exports = mongoose.model('Travel', travelSchema);
