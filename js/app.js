var routes;
var stops;


var map = L.map('map').fitBounds([
  [45.6077682, -122.9945375],
  [45.4289472, -122.4139835]
]);

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
  attribution: 'Built by <a href="http://merrittlawrenson.com">Merritt Lawrenson</a>, Transit Data &copy; <a href="https://trimet.org">TriMet</a>, Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, Imagery © <a href="http://maps.stamen.com/#toner-lite/">Stamen</a>',
  maxZoom: 18,
}).addTo(map);

// $.getJSON("./assets/tm_routes.geojson", function(routes) {
//   routes = L.geoJSON(routes, {
//     style: function (feature) {
//       return {color: "black", opacity: 0.5};
//     }
//     // ,
//     // filter: function (routeShape) {
//     //   return markers[vehicle.vehicleID].routeNumber == routeShape.properties.rte && markers[vehicle.vehicleID].direction == routeShape.properties.dir;
//     // }
//   }).addTo(map);   
// });

$.getJSON("./assets/tm_stops.geojson", function(stops) {
  stops = L.geoJSON(stops, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: function (feature) {
      return {
        radius: feature.properties.total === null ? 5 : (Math.log10(parseInt(feature.properties.total.replace(/,/g, '')) + .01) * 2),
        // radius: feature.properties.total === null ? 5 : feature.properties.total == 0 ? .02 : parseInt(feature.properties.total.replace(/,/g, '')) / 250,
        fillColor: feature.properties.total ? "#5174ad": "#aaa",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
    }
  }).bindPopup(function(feature) {
    return "<b>" + feature.feature.properties.stop_name + "</b><br>Stop ID: " + feature.feature.properties.stop_id + "<br><br>Ons: " + feature.feature.properties.ons + "<br>Offs: " + feature.feature.properties.offs + "<br><b>Total Riders: " + feature.feature.properties.total + "</b>";
  }).addTo(map);   
});