// Initialize and add the map
function initMap() {
    // The location of Uluru
    
    
    const image = "./car.png";
    var car_locations = [
    ['mXfkjrFw', 42.3453, -71.0464],
    ['nZXB8ZHz', 42.3662, -71.0621],
    ['Tkwu74WC', 42.3603, -71.0547],
    ['5KWpnAJN', 42.3472, -71.0802],
    ['uf5ZrXYw', 42.3663, -71.0544],
    ['VMerzMH8', 42.3542, -71.0704]
    ];                
    
    const southStation = { lat: 42.352271, lng: -71.05524200000001 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: southStation,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: southStation,
      map: map,
    });
    const car1 = new google.maps.Marker({
      position: { lat: car_locations[1][1], lng: car_locations[1][2] },
      map,
      icon: image,
    });
    const car2 = new google.maps.Marker({
      position: { lat: car_locations[2][1], lng: car_locations[2][2] },
      map,
      icon: image,
    });    
    
    // var marker, i;
    
    // for (i = 0; i < car_locations.length; i++) {  
    //   marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(car_locations[i][1], car_locations[i][2]),
    //     map: map,
    //     icon: image,
    //   });
      
    //   google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //     return function() {
    //       infowindow.setContent(car_locations[i][0]);
    //       infowindow.open(map, marker);
    //     }
    //   })(marker, i));
    // }

  }
  
  window.initMap = initMap;