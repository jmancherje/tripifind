const redis = require('../cache');

module.exports = {
  checkForCity: function(req, res, next) {
    const cityState = encodeURI(req.params.city.toLowerCase());

    redis.get(cityState, function(err, reply) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else if (!reply) {
        console.log('not found in cache..')
        next();
      } else {
        console.log('FOUND IN REDIS!!!, SENDING RESPONSE:')
        res.status(200).json(reply);
      }
    })
  },

  cacheCity: function(req, res, next) {
    const cityState = encodeURI(req.params.city.toLowerCase());
    const filteredJSON = JSON.stringify(req.filteredData);
    
    redis.set(cityState, filteredJSON, function() {
      // expire after 24 hours
      redis.expire(cityState, 86400);
      res.status(200).json(filteredJSON);
    });

    // for deleting purposes:
    // redis.del(cityState, function() {
    //   console.log('deleted san francisco')
    //   res.status(200).json(filteredJSON);
    // })

  }
}