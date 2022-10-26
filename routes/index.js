var express = require('express');
var router = express.Router();
var neDB = require('nedb');
var db = new neDB({ filename: 'my.db', autoload: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  db.find({}, function (err, docs) {
    if (err) {
      res.sendStatus(400).send(err);
    } else {
      res.render('index', {
        rows: docs
      });
    }
  });

});

router.get('/all', function(req, res){
  db.find({}, function (err, docs) {
    if (err) {
      res.sendStatus(400).send(err);
    } else {
      res.send(docs);
    }
  });
});

router.post('/add', function (req, res) {
  const entry = {
    ...req.body,
    date: new Date().toLocaleString(),
  };
  db.insert([entry], function (err, newDocs) {
    if (err) {
      res.sendStatus(400).send(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
