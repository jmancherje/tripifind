var controller = require('../controllers/controller.js');
var userController = require('../controllers/userController.js');
var dbController = require('../models/dbroutes.js');

module.exports = function(app, express) {

  //####### Documentation in Controller 
  app.post('/api/login', userController.login);
  app.post('/api/signup', userController.signup);
  app.get('/logout', userController.logout);
  app.get('/activities/*', controller.searchStoredData, controller.fetchCityData);
  app.post('/trips', controller.createTrip);
  app.get('/trips/:id', controller.accessTrip);
  app.get('/trips', controller.getAllTrips);

 //###### Live but not used in production############
  app.get('/api/user/*', userController.findUser);
  app.put('/api/user/*', userController.addTrips);
  app.get('/api/user/trips/*', userController.findAllUserTrips);

  
  //############Pending Routes#####################
  // app.get('/api/user/*/*', userController.findOneUserTrip);
  //app.get('/user', controller.checkAuth);
  // app.get('/activities/*', controller.fetchCityData);
  // app.get('/db/activities', dbController.retrieveActivities);
  // app.post('/db/activities', dbController.storeActivities);
  // app.delete('/trips', controller.deleteTrip);

}