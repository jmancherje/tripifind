var db = require('./dbconnect.js');
var User = require('./users.js');
var Trips = require('./trips.js');
var TripItems = require('./tripItem.js');

module.exports = function (app, express) {

  // app.post('/trips', function(req,res){
  //   var tripItem = new TripItems(
  //     {name: req.body.name,
  //      address: req.body.address,
  //      // notes: req.body.notes,
  //      category: req.body.category,
  //      rating: req.body.rating
  //      //link
  //     }
  //   )
  //   tripItem.save();
  //   res.sendStatus(200);
  // });


  // app.get('/trips', function(req,res){
  //   Trips.find(function (err, trips) {
  //     res.send(200, trips);
  //   })
  // })

  app.post('/signup', function(req,res) {
    var user = new User({
      username : req.body.username,
      password : req.body.password
    })

    user.save();
    res.sendStatus(200);
  })

  app.get('/signup', function(req,res) {
    User.find(function (err, tripitems) {
      res.send(200, tripitems);
    })
  })
}