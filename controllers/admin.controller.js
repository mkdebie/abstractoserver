const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

  
  exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            res.status(404).send({message: "Kan niet verwijderen =${id}"})
        } else {
            res.send ({message:"Succes"})
        }
    })
    .catch(err => {
        res.status(500).send({message:"Fout"})
    })
    
  };
  
