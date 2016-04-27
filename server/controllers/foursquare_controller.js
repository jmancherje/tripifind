const Foursquare = require('node-foursquare-venues')(process.env.FOURSQUARE_API, process.env.FOURSQUARE_SECRET);
const categoryIds = require('../constants/foursquare').categories;

// const filterFoursquareData = function(data) {
//   // filter data to match other filter function
// }

const filterFoursquareData = function(responseObj) {
  console.log('filtering this data: ', responseObj)
  var cityData = {};
  var activitiesRaw = responseObj.groups[0].items;
  cityData.location = responseObj.suggestedBounds;
  cityData.location.center = responseObj.geocode.center;
  cityData.activities = activitiesRaw.reduce(function(totalData, item) {
    console.log('item.venue ', item.venue)
    var location = item.venue.location;
    var photoURL = item.venue.featuredPhotos.items[0];
    var notes = item.tips === undefined ? '' : item.tips[0].text; 
    var tripItem = {
      name: item.venue.name,
      address: location.address + ', ' + location.city + ', ' + location.state + ' - ' + location.cc,
      city: location.city,
      notes: notes,
      category: item.venue.categories[0].name,
      rating: item.venue.rating,
      photo: photoURL.prefix + '300x300' + photoURL.suffix,
      url: item.venue.url,
      api: {
        name: 'foursquare',
        id: item.venue.id,
        website: 'https://foursquare.com/venue/' + item.venue.id
      },
      location: {
        longitude: location.lng,
        latitude: location.lat,
        formattedAddress: location.formattedAddress
      }
    };
    totalData.push(tripItem); 
    return totalData;
  }, []);
  console.log('fetched and filtered city data: ', cityData);
  return cityData;
}

module.exports = {
  searchVenueByCity: function(req, res, next) {
    // const cityState = req.params.city.toLowerCase();
    // console.log('searching by city state: ', encodeURI(cityState));
    var city;
    console.log('request city type: ', typeof req.params)
    console.log('request city: ', req.params)
    if (typeof req.params === 'object') {
      city = req.params.city;
    } else {
      city = req.params
    }
    Foursquare.venues.explore({
      near: city,
      categoryId: categoryIds
    }, function(err, data) {
      // console.log('error object? :', err);
      // console.log('data object? :', typeof data, data.response.groups[0].items)
      const filteredData = filterFoursquareData(data.response);
      res.status(200).json(filteredData);
    })
  }
}