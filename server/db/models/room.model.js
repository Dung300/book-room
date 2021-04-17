const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    unique: false,
    require: true,

  },
  image: {
    type: [[String]]
  },
  location: {
    type: String
  },
  floors:{
    type: Number,
  },
  _hotelId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  }
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = {
  Room
}
