
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    require: true,
  },
  totalPrice: {
      type: Number,
      require: true,
  },
  _hotelId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
  },
  _roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
  },
  _availabelRoom:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AvailableRoom'
  }
});

const Book = mongoose.model('Book', BookSchema);
module.exports = {
  Book
}

