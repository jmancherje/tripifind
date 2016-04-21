var mongoose = require('mongoose');

var tripsSchema = mongoose.Schema({
  name: String,
  destination: Array,
  image: String,
  //keyword: drinking, bars
  //users
  location: {
    ne: {
      lat: Number,
      lng: Number
    },
    sw: {
      lat: Number,
      lng: Number
    },
    center: {
      lat: Number,
      lng: Number
    }
  },
  activities : [{ type: mongoose.Schema.ObjectId,
    ref: 'tripItem' }]
});

var Trip = mongoose.model('Trip', tripsSchema);
module.exports = Trip;