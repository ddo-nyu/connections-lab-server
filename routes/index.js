var express = require('express');
var router = express.Router();
var neDB = require('nedb');
var db = new neDB({ filename: 'my.db', autoload: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
  var data = [ { name: 'John', score: '48' },
    { name: 'Henry', score: '19' },
    { name: 'Albert', score: '15' } ];
  db.insert(data, function (err, newDocs) {
    if (err) {
      res.sendStatus(400).send(err);
    } else {
      res.send('Success!');
    }
  });
});

module.exports = router;
