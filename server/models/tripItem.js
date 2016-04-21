var mongoose = require('mongoose');

var tripsItemsSchema = mongoose.Schema({
  name: String,
  address: String,
  city: String,
  notes: String,
  category: String,
  rating: String,
  photo: String,
  url: String,
  api: {
    name: String,
    id: String,
    website: String
  },
  location: {
    lat: Number,
    lng: Number,
    formattedAddress: [String]
  }
});

var TripItem = mongoose.model('TripItem', tripsItemsSchema);
module.exports = TripItem;