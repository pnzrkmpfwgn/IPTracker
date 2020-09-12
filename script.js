//global vars
var IP_ADDRESS = '';
var Lat = 0;
var Lng = 0;

//inittially setting up an empty map
var mymap = L.map('mapid');

//Main function for using ipify and geo.ipify
function setIpAndMap(IP) {
  fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${IP}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      document.getElementById('region').innerHTML =
        data.location.region + ', ' + data.location.city;
      document.getElementById('IP').innerHTML = data.ip;
      document.getElementById('isp').innerHTML = data.isp;
      document.getElementById('timezone').innerHTML =
        'UTC-' + data.location.timezone;
      Lat = data.location.lat;
      Lng = data.location.lng;

      console.log(Lat.toFixed(2), Lng.toFixed(2));
      console.log(data);
    })
    .then(function () {
      //We have to limit decimal places to 2 with method "toFixed(2)" in order to calculate
      //location correctly.
      Lat = Lat.toFixed(2);
      Lng = Lng.toFixed(2);
      mymap.setView([Lat, Lng], 13);
      var marker = L.marker([Lat, Lng], {icon: mapIcon}).addTo(mymap);
    });
}
//getting user ip by default
function getIP(json) {
  IP_ADDRESS = json.ip;
}

//initially setting up map and ip info
setIpAndMap(IP_ADDRESS);

//Working with user input
document.getElementById('ip_input').addEventListener('click', function (event) {
  event.preventDefault();
  var userInput = document.getElementById('input').value;
  IP_ADDRESS = userInput;
  setIpAndMap(IP_ADDRESS);
});
console.log('You have been hacked Cemal!');
//using map api and specializing it
L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token',
  }
).addTo(mymap);
var mapIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [30, 50],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});
