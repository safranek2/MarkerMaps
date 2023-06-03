var map;
var markers = [];

var loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var usernameInput = loginForm.querySelector("input[name='rusername']");
  var passwordInput = loginForm.querySelector("input[name='rpassword']");
  var username = usernameInput.value;
  var password = passwordInput.value;

  setTimeout(function () {
    if (username === "spravne-uzivatelske-jmeno" && password === "spravne-heslo") {
      alert("Přihlášení úspěšné!");

      initializeMap();
    } else {
      alert("Neplatné přihlašovací údaje!");
    }
    usernameInput.value = "";
    passwordInput.value = "";
  }, 1000);
});

  map = L.map('map').setView([49.74369357397428, 15.338693012913026], 8);;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Authors: David Šafránek, Jakub Svoboda, Ondřej Šembera',
  }).addTo(map);

  L.marker([49.74369357397428, 15.338693012913026]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.');

  map.toggleFullscreen();

  map.on('click', addMarker);


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

var savedMarkers = loadMarkersFromDatabase();
if (savedMarkers) {
  savedMarkers.forEach(function (markerData) {
    addMarker(markerData);
  });
}

function saveMarkerToDatabase(markerData) {
  // Tady bysme měli provést nějaký "volání na backend server", který má uložit marker do databáze

}

// Načtení uložených značek z databáze
function loadMarkersFromDatabase() {
  // Tady bysme měli provést "volání na backend server", který načte markery z databáze

  return null;
}
