document.addEventListener("DOMContentLoaded", function () {
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
        enableMarkerCreation();
        enableMarkerEditing();
      } else {
        alert("Neplatné přihlašovací údaje!");
      }
      usernameInput.value = "";
      passwordInput.value = "";
    }, 1000);
  });








  function initializeMap() {

    map = L.map('map').setView([51.505, -0.09], 13);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);


    var savedMarkers = loadMarkersFromDatabase();
    if (savedMarkers) {
      savedMarkers.forEach(function (markerData) {
        addMarker(markerData);
      });
    }
  }








  function enableMarkerCreation() {

    map.on('click', function (event) {
      var latitude = event.latlng.lat;
      var longitude = event.latlng.lng;


      var markerData = {
        lat: latitude,
        lng: longitude,
        name: prompt("Zadejte název místa:")
      };

      if (markerData.name) {
        addMarker(markerData);
        saveMarkerToDatabase(markerData);
      }
    });
  }








  function addMarker(markerData) {
    var marker = L.marker([markerData.lat, markerData.lng]).addTo(map);
    marker.bindPopup(markerData.name).openPopup();

    markers.push(marker);
  }








  function saveMarkerToDatabase(markerData) {
    // Tady bysme měli provést nějaký "volání na backend server", který má uložit marker do databáze

  }








  // Načtení uložených značek z databáze
  function loadMarkersFromDatabase() {
    // Tady bysme měli provést "volání na backend server", který načte markery z databáze

    return null;
  }







  function deleteMarkers() {
    markers.forEach(function (marker) {
      map.removeLayer(marker);
    });
    markers = [];

    // Tady bysme měli provést "volání na backend server", který smaže markery z databáze

  }







  function enableMarkerEditing() {
    markers.forEach(function (marker) {
      marker.on('click', function (event) {
        var newMarkerName = prompt("Zadejte nový název místa:");
        if (newMarkerName) {
          marker.setPopupContent(newMarkerName);
          var markerData = {
            lat: marker.getLatLng().lat,
            lng: marker.getLatLng().lng,
            name: newMarkerName
          };
          updateMarkerInDatabase(markerData);
        }
      });
    });
  }










  function updateMarkerInDatabase(markerData) {
    // Tady bysme měli provést "volání na backend server", který aktualizuje marker v databázi

  }
});