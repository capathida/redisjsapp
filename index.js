const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

// Create Redis Client
let db = redis.createClient();

db.on('connect', function() {
  console.log('Connected to Redis...');
});

// Set Port
const port = 3333;

// Init app
const app = express();

// View Engine\
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

// Search Page
app.get('/', function(req, res, next){
  res.render('getkey');
});

// Search processing
app.post('/key/get', function(req, res, next){
  let key = req.body.key;

  db.hgetall(key, function(err, obj){
    if(!obj){
      res.render('getkey', {
        error: 'User does not exist'
      });
    } else {
      obj.key = key;
      res.render('showdata', {
        data: obj
      });
    }
  });
});

// Add Data Page
app.get('/data/add', function(req, res, next){
  res.render('adddata');
});

// Process Data Page
app.post('/data/add', function(req, res, next){
  let key = req.body.key;
  let value = req.body.value;

  db.hmset(key, [
    'container', value
    ], function(err, reply){
    if(err){
      console.log(err);
    }
    console.log(reply);
    res.redirect('/');
  });
});

// Delete Data with Key
app.delete('/data/delete/:key', function(req, res, next){
  db.del(req.params.key);
  res.redirect('/');
});

app.listen(port, function(){
  console.log('Server started on port '+port);
});
