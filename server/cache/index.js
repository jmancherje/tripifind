const redis = require('redis');

// redis:
var client;
if (process.env.PRODUCTION) {
  client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
} else {
  client = redis.createClient();
}

client.on('connect', function() {
  console.log('connected to redis server');
})

module.exports = client;