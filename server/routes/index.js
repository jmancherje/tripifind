const express = require('express');

// other routers:
const activitiesRouter = require('./activities_routes');
const tripsRouter = require('./trips_routes');
const userRouter = require('./user_routes');

const router = express.Router();
router.use('/activities', activitiesRouter);
router.use('/trips', tripsRouter);
router.use('/user/', userRouter);

module.exports = router;

// module.exports = function(app, express) {

//   //####### Documentation in Controller 
//   app.post('/api/login', userController.login);
//   app.post('/api/signup', userController.signup);
//   app.get('/logout', userController.logout);
//   // app.get('/activities/*', controller.fetchCityData);
//   // app.post('/trips', controller.createTrip);
//   // app.get('/trips/:id', controller.accessTrip);
//   // app.get('/trips', controller.getAllTrips);

//  //###### Live but not used in production############
//   app.get('/api/user/*', userController.findUser);
//   app.put('/api/user/*', userController.addTrips);
//   app.get('/api/user/trips/*', userController.findAllUserTrips);

  
//   //############Pending Routes#####################
//   // app.get('/api/user/*/*', userController.findOneUserTrip);
//   //app.get('/user', controller.checkAuth);
//   // app.get('/activities/*', controller.fetchCityData);
//   // app.get('/db/activities', dbController.retrieveActivities);
//   // app.post('/db/activities', dbController.storeActivities);
//   // app.delete('/trips', controller.deleteTrip);

// }