const mongoose = require('mongoose');

const AvailableRoomSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  _roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  _hotelId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
},
  price: {
    type: Number
  }
});

const AvailableRoom = mongoose.model('AvailableRoom', AvailableRoomSchema);
module.exports = {
  AvailableRoom
}
