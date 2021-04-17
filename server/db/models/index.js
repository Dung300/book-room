const {User} = require("./user.model");
const {Place} = require("./place.model");
const {Room} = require("./room.model");
const {TypeRoom} = require("./typeRoom.model");
const {AvailableRoom} = require("./availableRoom.model");
const {HotelComment} = require("./hotelComment.model");
const {Book} = require("./booking.model");
const {RoomComment} = require("./roomComment.model");


module.exports = {
   User,
   Place,
   Room,
   TypeRoom,
   AvailableRoom,
   HotelComment,
   Book,
   RoomComment
  }
