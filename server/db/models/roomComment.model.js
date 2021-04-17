
const mongoose = require('mongoose');

const RoomCommentSchema = new mongoose.Schema({
  UserName: {
    type: String,
    require: true,
    unique: false,

  },
  comment: {
      type: String,
      require: true,

    },
    _roomId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
      },
});

const RoomComment = mongoose.model('RoomComment', RoomCommentSchema);
module.exports = {
  RoomComment
}

