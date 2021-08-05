const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    //_______ Contactsection
    confirmedFriends: [],
    invitedFriends:  [],
    invitationsFromFriends:  [],
    // array voor uitgebreid Friends informatie
    confirmedFriendsData: [],
    invitedFriendsData:[],
    invitationsFromFriendsData:  [],
  })
);

module.exports = User;