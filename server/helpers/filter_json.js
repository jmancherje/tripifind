


module.exports = {
  filterTripData: function(responseObj) {
    return responseObj.reduce(function(totalData, item) {
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
  },

  parseCityName: function(cityRequest) {
    var cityLowercase = cityRequest.split(',')[0];
    var city = '';
    if (cityLowercase.indexOf(' ') > 0) {
      var splitCity = cityLowercase.split(' ');
      var firstCityHalf = splitCity[0][0].toUpperCase() + splitCity[0].slice(1);
      var secondCityHalf = splitCity[1][0].toUpperCase() + splitCity[1].slice(1);
      city += firstCityHalf + ' ' + secondCityHalf;
    } else {
      city += cityLowercase[0].toUpperCase() + cityLowercase.slice(1);
    }
    return city;
  }
}
