const db = require("../models");
const Article = db.article;
var mongoose = require('mongoose') 
  
  exports.saveArticle = (req, res) => {
    var pubId = req.body.pubId;
    console.log(req.body.abstract)

    const verwerkArtikel = async() => {
      return new Promise((resolve, reject) => {
        Article.findOne({"pubId":pubId})
        .then (document => {
          if (!document) {
            console.log("creer document")
           artikel = new Article({
              pubId: req.body.pubId,
              title: req.body.title,
              journal: req.body.journal,
              pubDate: req.body.pubDate,
              firstAuth: req.body.firstAuth,
              userBookmarks: [], 
              abstract: req.body.abstract, 
            })
          } else
          {
            artikel = document;
          }
          artikel.userBookmarks.push(req.params.id)
          resolve (artikel);
      })
      })}
    
      const save = async() => {
        return new Promise((resolve, reject) => {
          console.log(artikel)
          artikel.save();
          resolve ("klaar")
        })}

    const handleSaveArtikel = async() => {
      let first = await verwerkArtikel();
      let second = await save();
    }
    handleSaveArtikel();
  };

  exports.getAllArticles = (req,res) => {
    const user = req.params.id;
    console.log(user);
    Article.find({"userBookmarks" : user})
    .then(documents => {
      res.status(200).json({
        message: 'Succesvolle date retrieval alle artikele',
        artikels: documents});
    console.log(documents)});
  };

  exports.getArticle = (req,res) => {
    const id = req.params.id;
    console.log (id)

    Article.findOne({'_id' : id})
    .then(document => {
      res.status(200).json({
        message: "Aritkel gevonden",
        artikel: document
      })
    });
  }

  exports.saveTag = async (req,res) => {
    const id = req.params.id;
    const tag = req.body;
    const artikel = await Article.findOne({'pubId':id})


    const updateArray = async() => {
      return new Promise ((resolve, reject) => {
        artikel.tags.push(tag);
        resolve ("finished")
      })
    }

    const save = async() => {
      return new Promise ((resolve, reject) => {
        artikel.save();
        resolve ("finished")
      })
    }

    const verwerkUpdate = async () => {

      let second = await updateArray();
      let third = await save();
    }
    verwerkUpdate();
  }

  
