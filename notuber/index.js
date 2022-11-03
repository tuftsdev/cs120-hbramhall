
var lat = 0;
var lng = 0;
var me = new google.maps.LatLng(lat, lng);
var myOptions = {
    zoom: 13,
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var nearestCar = '';
var nearestCarDist = 1000000000000000;
var nearestCarLoc;
var map;
var marker;
var infowindow = new google.maps.InfoWindow();

function init(){ // { zoom: 14, center: { lat: 42.352271, lng: -71.055242 }}
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    getMyLocation(); 
}

function getMyLocation(){
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(somePos) {
            lat = somePos.coords.latitude;
            lng = somePos.coords.longitude;
            renderMap();
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.  What a shame!");   
    }
}

function renderMap() {
    me = new google.maps.LatLng(lat, lng);
    
    map.panTo(me);

    marker = new google.maps.Marker({
        position: me,
        title: "Harry's Location"
    });

    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title + "<br>" + nearestCar  + " is " + (nearestCarDist * 0.000621371).toFixed(2) + " miles away");
        infowindow.open(map, marker);
    });

    getNearbyCars();
}

function getNearbyCars(){
    var numLines;
    var carMarker;
    var http = new XMLHttpRequest();
    var url = 'https://jordan-marsh.herokuapp.com/rides';
    var params = 'username=AmiUR1Xl&lat=' + lat + '&lng=' + lng;
    var resultingData = '';
    var carsData = '';
    
    http.open('POST', url, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            resultingData = http.responseText;
            carsData = JSON.parse(resultingData);
            
            for (numLines = 0; numLines < carsData.length; numLines ++){
                var carLoc = new google.maps.LatLng(carsData[numLines].lat, carsData[numLines].lng); 
                var carDist = getDistance(me, carLoc);
                if( nearestCarDist > carDist ){
                    nearestCar = carsData[numLines].username;
                    nearestCarDist = carDist;
                    nearestCarLoc = carLoc;
                }

                (carMarker = new google.maps.Marker({ position: carLoc, map: map, icon: "./car.png" })),
                google.maps.event.addListener(
                    carMarker,
                    "click",
                    (function (carMarker, numLines) {
                        return function () {
                            var carLoc2 = new google.maps.LatLng(carsData[numLines].lat, carsData[numLines].lng);
                            infowindow.setContent(carsData[numLines].username + 'is '+ (getDistance(me, carLoc2) * 0.000621371).toFixed(2) + ' miles away!' ), infowindow.open(map, carMarker);
                        };
                    })(carMarker, numLines)
                );                
            }
            polyLine(me, nearestCarLoc);
        }
    }
    http.send(params);
}

function getDistance(pickupCoords, carCoords){
    var distInMeters = google.maps.geometry.spherical.computeDistanceBetween(pickupCoords, carCoords);
    return (distInMeters);
}

function polyLine(start, stop){
    const flightPlanCoordinates = [start,stop];    

    const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
    
      flightPath.setMap(map);

}

window.init = init;