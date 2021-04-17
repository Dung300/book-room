const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');

const {User,Place,TypeRoom, Room,AvailableRoom,HotelComment,Book,RoomComment} = require('./db/models');


app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const { Hotel } = require('./db/models/hotel.model');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the req from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
  res.header('Access-Control-Expose-Headers', "x-access-token, x-refresh-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  next();
});

//////////////////////////////////////////////////////////
 /* MIDDLEWARES APPLY TO USER ONLY */

//Verify refresh token middleware (which will be verifying the session)
let verifySession = ((req, res, next) => {
  //Grab refresh token from req header
  let refreshToken = req.header('x-refresh-token');
  //Grab id from req header
  let _id = req.header('_id');
  User.findByIdAndToken(_id, refreshToken).then((user) => {
    if (!user) {
      //User couldn't be found
      return Promise.reject({'error':'User not found. Make sure that refresh token and user id are correct'});
    }

    //If code reaches here, the user was found. Therefore, the refresh token exists in the database, but still have to check if it expires or not
    req._id = user._id;
    req.refreshToken = refreshToken;
    req.userObject = user;
    let isSessionValid = false;
    //Check if session has expired or not
    user.sessions.forEach((session) => {
      if (session.token === refreshToken) {
        if (User.hasRefreshTokenExpired(session.expiresAt) === false){
          isSessionValid = true;
        }
      }
    })

    if (isSessionValid) {
      //The session is valid, call next() to continue with processing this web req
      next();
    } else {
      return Promise.reject({
        //The session is not valid
        'error' : 'Refresh token has expired or the session is invalid'
      })
    }
  }).catch((e) => {
    res.status(401).send(e); //401: Unauthorized access
  })
})

//Authentication middleware (check whether the req has valid JWT access token)
let authenticate = (req, res, next) => {
  let token = req.header('x-access-token');
  //Verify JWT
  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
    //If there is an error (invalid access token), DO NOT AUTHENTICATE
    if (err) {
      res.status(401).send(err);
    } else {
      //JWT is valid
      req._id = decoded._id;
      next();
    }
  })
}
/* END MIDDLEWARE*/
///////////////////////////////////////////////////////////// USER /////////////////////////////////////////////////////////////
app.post('/users', (req, res) => {
  //Create a new user
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;
  let username = req.body.username;
  let address = req.body.address;

  let newUser = new User({name ,email,phone,username,password ,address});
  newUser.save().then(() => {
    return newUser.createSession();
  }).then((refreshToken) => {
    //Session created successfully, refresh token returned
    //Now generate an access auth token for the user
    return newUser.generateAccessAuthToken().then((accessToken) => {
      //Access token generated successfully
      //Now return an object containing the auth tokens
      return { accessToken, refreshToken }
    })
  }).then((authTokens) => {
    //Now construct and send respond to user with their auth tokens in the header and user object in the body
    res
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser);

  }).catch((e) => {
    res.status(400).send(e);
  })

})

//User logins
app.post('/users/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.findByCredentials(username, password).then((user) => {
    return user.createSession().then((refreshToken) => {
      return user.generateAccessAuthToken().then((accessToken) => {
        return { accessToken, refreshToken }
      })
    }).then((authTokens) => {
      //Now construct and send respond to user with their auth tokens in the header and user object in the body
      res
          .header('x-refresh-token', authTokens.refreshToken)
          .header('x-access-token', authTokens.accessToken)
          .send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  })
})
//Generate and return access token
app.get('/users/me/access-token', verifySession, (req, res) => {
  //The user/caller is authenticated, user id and user object is available
  req.userObject.generateAccessAuthToken().then((accessToken) => {
    res.header('x-access-token', accessToken).send({ accessToken });
  }).catch((e) => {
    res.status(400).send(e);
  })
})

app.get('/user', (req, res) => {
  User.find({}).then((user) => {
    res.send(user);
  }).catch((e) => {
    res.send(e);
  });
})



app.get('/user/:id', (req, res) => {
  User.find({_id: req.params.id}).then((user) => {
    res.send(user);
  }).catch((e) => {
    res.send(e);
  });
})
//////////////////////Place//////////////////

app.post('/place', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let name = req.body.name
  let image = req.body.image
  let newPlace = new Place({
    name,image
  });
  newPlace.save().then((placeDoc) => {
    //The full post document is returned (including id)
    res.send(placeDoc);
  })
})
app.get('/place', (req, res) => {
  Place.find({}).then((place) => {
    res.send(place);
  }).catch((e) => {
    res.send(e);
  });
})



app.get('/place/:id', (req, res) => {
  Place.find({_id: req.params.id}).then((place) => {
    res.send(place);
  }).catch((e) => {
    res.send(e);
  });
})
////////////////////////hotel////////////////
app.post('/hotel', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let name = req.body.name
  let image = req.body.image
  let address = req.body.address
  let totalRoom = req.body.totalRoom
  let introduce = req.body.introduce
  let _placeId = req.body._placeId

  let newHotel = new Hotel({
    name,image,address,totalRoom,introduce,_placeId
  });
  newHotel.save().then((HotelDoc) => {
    //The full post document is returned (including id)
    res.send(HotelDoc);
  })
})
app.get('/hotel', (req, res) => {
  Hotel.find({}).then((hotel) => {
    res.send(hotel);
  }).catch((e) => {
    res.send(e);
  });
})



app.get('/hotel/:id', (req, res) => {
  Hotel.find({_id: req.params.id}).then((hotel) => {
    res.send(hotel);
  }).catch((e) => {
    res.send(e);
  });
})
/////////////////////commenthotel////////////////////
app.post('/commenthotel', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let UserName = req.body.UserName
  let comment = req.body.comment
  let _hotelId = req.body._hotelId


  let newCommentHotel = new HotelComment({
    UserName,comment,_hotelId
  });
  newCommentHotel.save().then((CommentHotelDoc) => {
    //The full post document is returned (including id)
    res.send(CommentHotelDoc);
  })
})
app.get('/commenthotel', (req, res) => {
  HotelComment.find({}).then((commenthotel) => {
    res.send(commenthotel);
  }).catch((e) => {
    res.send(e);
  });
})


app.get('/commenthotel/:id', (req, res) => {
  HotelComment.find({_id: req.params.id}).then((commenthotel) => {
    res.send(commenthotel);
  }).catch((e) => {
    res.send(e);
  });
})

/////////////////////room////////////////////////////

app.post('/room', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let roomNumber = req.body.roomNumber
  let image = req.body.image
  let location = req.body.location
  let floors = req.body.floors
  let _hotelId = req.body._hotelId

  let newRoom = new Room({
    roomNumber,image,location,floors,_hotelId
  });
  newRoom.save().then((RoomDoc) => {
    //The full post document is returned (including id)
    res.send(RoomDoc);
  })
})
app.get('/room', (req, res) => {
  Room.find({}).then((room) => {
    res.send(room);
  }).catch((e) => {
    res.send(e);
  });
})



app.get('/room/:id', (req, res) => {
  Room.find({_id: req.params.id}).then((v) => {
    res.send(room);
  }).catch((e) => {
    res.send(e);
  });
})
////////////////////typeroom///////////////
app.post('/typeroom', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let type = req.body.type
  let bedType = req.body.bedType
  let describe = req.body.describe
  let _roomId = req.body._roomId


  let newTypeRoom = new TypeRoom({
    type,bedType,describe,_roomId
  });
  newTypeRoom.save().then((TypeRoomDoc) => {
    //The full post document is returned (including id)
    res.send(TypeRoomDoc);
  })
})
app.get('/typeroom', (req, res) => {
  TypeRoom.find({}).then((typeroom) => {
    res.send(typeroom);
  }).catch((e) => {
    res.send(e);
  });
})


app.get('/typeroom/:id', (req, res) => {
  TypeRoom.find({_id: req.params.id}).then((v) => {
    res.send(typeroom);
  }).catch((e) => {
    res.send(e);
  });
})
//////////////////////commentroom///////////
app.post('/commentroom', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let UserName = req.body.UserName
  let comment = req.body.comment
  let _roomId = req.body._roomId


  let newRoomComment = new RoomComment({
    UserName,comment,_roomId
  });
  newRoomComment.save().then((RoomCommentDoc) => {
    //The full post document is returned (including id)
    res.send(RoomCommentDoc);
  })
})
app.get('/commentroom', (req, res) => {
  RoomComment.find({}).then((commentroom) => {
    res.send(commentroom);
  }).catch((e) => {
    res.send(e);
  });
})


app.get('/commentroom/:id', (req, res) => {
  RoomComment.find({_id: req.params.id}).then((commentroom) => {
    res.send(commentroom);
  }).catch((e) => {
    res.send(e);
  });
})
/////////////////////availabelroom/////////
app.post('/availabelroom', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let date = req.body.date
  let price = req.body.price
  let _hotelId = req.body._hotelId
  let _roomId = req.body._roomId


  let newAvailableRoom = new AvailableRoom({
    date,_hotelId,_roomId,price
  });
  newAvailableRoom.save().then((AvailableRoomDoc) => {
    //The full post document is returned (including id)
    res.send(AvailableRoomDoc);
  })
})
app.get('/availabelroom', (req, res) => {
  AvailableRoom.find({}).then((availabelroom) => {
    res.send(availabelroom);
  }).catch((e) => {
    res.send(e);
  });
})


app.get('/availabelroom/:id', (req, res) => {
  AvailableRoom.find({_id: req.params.id}).then((availabelroom) => {
    res.send(availabelroom);
  }).catch((e) => {
    res.send(e);
  });
})
//////////////////////////book/////////////
app.post('/book', (req, res) => {
  //Create a new post and return post document back to user (including post's id)
  //Post's info (fields) will be passed in via JSON req body
  let quantity = req.body.quantity
  let totalPrice = req.body.totalPrice
  let _hotelId = req.body._hotelId
  let _roomId = req.body._roomId
  let _availabelRoom = req.body._availabelRoom


  let newBook = new Book({
    quantity,totalPrice,_hotelId,_roomId,_availabelRoom
  });
  newBook.save().then((BookDoc) => {
    //The full post document is returned (including id)
    res.send(BookDoc);
  })
})
app.get('/book', (req, res) => {
  Book.find({}).then((book) => {
    res.send(book);
  }).catch((e) => {
    res.send(e);
  });
})


app.get('/book/:id', (req, res) => {
  Book.find({_id: req.params.id}).then((book) => {
    res.send(book);
  }).catch((e) => {
    res.send(e);
  });
})

////////////////////////////////////////////
app.listen(3000, () => {
  console.log(`App is listening at http://localhost:3000`)
})
