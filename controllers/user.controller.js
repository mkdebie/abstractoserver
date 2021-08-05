const db = require("../models");
const util = require ('util');
const ROLES = db.ROLES;
const User = db.user;
var mongoose = require('mongoose') 

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content 2.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    User.find()
    .populate("roles", "-__v")
    .then(documents => {
      res.status(200).json({
        message: 'Succesvolle date retrieval voor administrator',
        users: documents})
    }
    )};

  

  exports.getUsers = (req, res) => {
    User.find()
    .then(documents => {
      res.status(200).json({
        message:'succesvolle user data retrieval',
        users:documents})
      })

  };


  //Creert overzicht van alle contacten
  exports.contactBoard = async (req, res) => {
    const username = req.params.username;
    const doc = await User.findOne({'username': username}).exec();

    const invitationFiller = async () => {
      const promises =[];
      doc.invitationsFromFriends.forEach((element) => {
        promises.push(User.findById(element).exec())
      });
      const outputs = await Promise.all(promises);
      outputs.forEach((result) => doc.invitationsFromFriendsData.push(result.username))
    }

    const confirmedFiller = async () => {
      const promises =[];
      doc.confirmedFriends.forEach((element) => {
        promises.push(User.findById(element).exec())
      });
      const outputs = await Promise.all(promises);
      outputs.forEach((result) => doc.confirmedFriendsData.push(result.username))
    }

    const invitedFiller = async () => {
      const promises =[];
      doc.invitedFriends.forEach((element) => {
        promises.push(User.findById(element).exec())
      });
      const outputs = await Promise.all(promises);
      outputs.forEach((result) => doc.invitedFriendsData.push(result.username))
    }

    const send = async () => {
      return new Promise((resolve, reject)=> {
        res.status(200).json({
          message:"retrieved user contacts",
          contacts: doc
          })
          resolve ('gelukt')
        })

    };

    const verzend = async() => {
      let first = await invitationFiller();
      let second = await confirmedFiller();
      let third = await invitedFiller();
      let last = await send();
    }

    verzend();
  }

  //Afhandelen van nieuwe invites ** PM nog een Boodschap functie 
  exports.inviteUser = (req, res) => {
    const invitedUsername = req.params.username;
    const invitationFromUser = req.params.user;
    const invitationFromUserParsed = new mongoose.Types.ObjectId(invitationFromUser);
    var id ='';
    User.findOne({'username': invitedUsername})
    .then(document => {
      id=document._id;
      document.invitationsFromFriends.push(invitationFromUserParsed)
      document.save();
    })
    User.findById(invitationFromUser)
    .then (document => {
      document.invitedFriends.push(id)
      document.save();
    })
  }
 
  //Afhandelen van invites ** Accept or Reject
  exports.acceptinvite = (req, res) => {
    const acceptedUsername = req.params.username;
    const acceptingUser = req.params.user;
    var acceptedUserId ="";
    var acceptingUserId = "";
    var acceptingUserDocument="";
    var acceptedUserDocument="";

    const getAcceptedUser = async () => {
      const gebruiker1 = await User.findOne({'username' : acceptedUsername})
        .then (document => {
          acceptedUserDocument = document;
          acceptedUserId = document._id;
        })
       }
    

    const getAcceptingUser = async () => {
      const gebruiker1 = await User.findOne({'username' : acceptingUser})
        .then (document2 => {
          acceptingUserDocument = document2;
          acceptingUserId = document2._id;
        })
    }

    const fixArray = async() => {
      return new Promise((resolve, reject) => {
          acceptedUserDocument.confirmedFriends.push(acceptingUserId);
          for (var i = 0; i < acceptedUserDocument.invitedFriends.length; i++) {
            if (acceptedUserDocument.invitedFriends[i] == acceptingUserId.toString()) {
              acceptedUserDocument.invitedFriends.splice (i,1);
            }}
            acceptingUserDocument.confirmedFriends.push(acceptedUserId);
            for (var i = 0; i < acceptingUserDocument.invitationsFromFriends.length; i++) {
              if (acceptingUserDocument.invitationsFromFriends[i] == acceptedUserId.toString()) {
                acceptingUserDocument.invitationsFromFriends.splice (i,1);
              }      
          }
          resolve ("klaar");
        })
        }

    const save = async() => {
      return new Promise((resolve, reject) => {
        acceptingUserDocument.save();
        acceptedUserDocument.save();
        resolve ("klaar")
      })}

    const verwerkAccept = async() => {
      let first = await getAcceptedUser();
      let second = await getAcceptingUser();
      let third = await fixArray();
      let fourth = await save();
    }
    verwerkAccept();
  }

  exports.rejectInvite = (req, res) => {
    const rejectedUsername = req.params.username;
    const rejectingUser = req.params.user;
    var rejectedUserId ="";
    var rejectingUserId = "";

    const getRejectedUser = async () => {
      const gebruiker1 = await User.findOne({'username' : rejectedUsername})
        .then (document => {
          rejectedUserId = document._id;
        })
       }
    

    const getRejectingUser = async () => {
      const gebruiker1 = await User.findOne({'username' : rejectingUser})
        .then (document2 => {
          rejectingUserId = document2._id;
        })
    }

    const fixArray = async() => {
      return new Promise((resolve, reject) => {
        User.findById(rejectedUserId)
        .then(document3 => {
          for (var i = 0; i < document3.invitedFriends.length; i++) {
            if (document3.invitedFriends[i] == rejectingUserId.toString()) {
              document3.invitedFriends.splice (i,1);
            }
          }
          document3.save();
        })
        User.findById(rejectingUserId)
        .then(document4 => {
          for (var i = 0; i < document4.invitationsFromFriends.length; i++) {
            if (document4.invitationsFromFriends[i] == rejectedUserId.toString()) {
              document4.invitationsFromFriends.splice (i,1);
            }          
        }
        document4.save();
      })
        resolve ('gelukt');
      })
    }
    const verwerkReject = async() => {
      let first = await getRejectedUser();
      let second = await getRejectingUser();
      let third = await fixArray();
    }
    verwerkReject();
  }
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
