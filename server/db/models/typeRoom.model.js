const mongoose = require('mongoose');

const TypeRoomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  bedType: {
    type: String
  },
  describe: {
    type: String
  },
  _roomId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
},
});

const TypeRoom = mongoose.model('TypeRoom', TypeRoomSchema);
module.exports = {
  TypeRoom
}
