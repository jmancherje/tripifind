const jwt = require('express-jwt');

const jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

module.exports = {
  jwtCheck: jwtCheck
}