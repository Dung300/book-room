const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  image: {
    type: String,
  },
  address:{
    type: String,
  },
  totalRoom:{
    type: Number,
  },
  introduce:{
    type: String,
  },
  _placeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
    },
});

const Hotel = mongoose.model('Hotel', HotelSchema);
module.exports = {
  Hotel
}
