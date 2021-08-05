const parser = require ('xml2json');
const https = require('https');
var mongoose = require('mongoose') 
const db = require("../models");
const Journal = db.journal;

exports.saveJournal = (req, res) => {
    journal = new Journal({
      journal: req.body.Journal,
      issn: req.body.Issn
    })
    journal.save();

    res.status(200).send("Public Content 2.");
}

exports.getJournals = (req, res) => {
  console.log("hallo")
  Journal.find()
  .then(journals => {
    res.status(200).json({
      message: "Success retrieving journals",
      journals: journals
    })
  })
}

exports.convertxml = (req, res) => {
    var id=req.params.id;
    var data = [''];
    var data2 ='';
    var finaldata = '';
    var iddata ='';
    var idstring ='';
    var searchTerm = req.params.id
    var query = "&term="+searchTerm+"+AND+hasabstract&reldate=30&retmax=20"

    function getIds() {
      return new Promise(resolve=> {
        https.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed'+query, function(res) {
          if (res.statusCode >= 200 && res.statusCode < 400)  {
            res.on('data', function(data_) { data += data_.toString(); });
            res.on('end', function() {
              iddata = parser.toJson(data), resolve('klaar');
              iddata = JSON.parse(iddata)
            });
        }})})
    }

    function generateIdlist() {
      return new Promise(resolve=> {
        arr = iddata.eSearchResult.IdList.Id;
        arr.forEach(element => {
          if (!idstring) {
            idstring = element;
          }
          else {
            idstring = idstring + "," + element
          }
        });
         resolve("klaar");
        
      })
    }

    function vertaaldata(){
      return new Promise (resolve => {
        https.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=' + idstring +'&retmode=xml', function(res) {
        if (res.statusCode >= 200 && res.statusCode < 400)  {
            res.on('data', function(data2_) { data2 += data2_.toString(); });
            res.on('end', function() {
              finaldata = parser.toJson(data2), resolve('klaar');
            });
      }})})
      }
   
      async function calltranslator() {
        const haalIdop = await getIds();
        const maakidlijst = await generateIdlist();
        const result2 =  await vertaaldata();
        res.status(200).json({
          message:'Succesvolle Json convert',
          data:finaldata
          })
      }
      calltranslator();
    }