
const mongoose = require('mongoose');

const HotelCommentSchema = new mongoose.Schema({
  UserName: {
    type: String,
    require: true,
    unique: false,

  },
  comment: {
      type: String,
      require: true,

    },
    _hotelId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
      },
});

const HotelComment = mongoose.model('HotelComment', HotelCommentSchema);
module.exports = {
  HotelComment
}

