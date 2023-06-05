let map;
let markers = [];
let currentMarker = null;

map = L.map('map').setView([49.74369357397428, 15.338693012913026], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© 2023 SPŠE Ječná by David Šafránek, Jakub Svoboda, Ondřej Šembera'
}).addTo(map);

if (typeof databaseMarkers !== 'undefined' && databaseMarkers.length > 0) {
    for (let i = 0; i < databaseMarkers.length; i++) {
        let marker = L.marker([databaseMarkers[i].latitude, databaseMarkers[i].longitude]).addTo(map).bindPopup(
            `<div class="text-center"><p style="margin-bottom: 0;">${databaseMarkers[i].name}</p><button type="button" class="btn btn-sm btn-link" onclick="removeMarker(${i})">DELETE</button></div>`,
            {
                closeButton: false
            }
        );
        markers.push(marker);
        marker.index = i;
    }
}

map.on('click', addMarker);

function addMarker(e) {
    if (currentMarker !== null) {
        map.removeLayer(currentMarker);
    }
    let markerId = (markers.length - 1).toString();
    let marker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup(
            '<div><input type="text" class="form-control" id="marker' + markerId + '" style="min-width: 250px;" name="name" placeholder="Enter something" maxlength="40"></div>',
            {
                closeButton: false
            }
        ).openPopup()

    currentMarker = marker;
    createEnter(markerId, marker);

    markers.push(marker);
    marker.index = markers.length - 1;
}

function createEnter(markerId, marker) {
    let input = document.getElementById("marker" + markerId);
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            saveMarker(markerId, marker);
        }
    });
}

function saveMarker(id, marker) {
    let markerNameInput = document.getElementById(`marker${id}`);
    let markerName = markerNameInput.value;

    if (markerName) {
        let index = marker.index;
        marker.setPopupContent(
            `<div class="text-center"><p style="margin-bottom: 0;">${markerName}</p><button type="button" class="btn btn-sm btn-link" onclick="removeMarker(${index})">DELETE</button></div>`,
        )

        let latlng = marker.getLatLng();

        let markerData = {
            lat: latlng.lat,
            lng: latlng.lng,
            name: markerName
        };

        saveMarkerToDatabase(markerData);
    } else {
        removeMarker(marker.index);
    }
    currentMarker = null;
}

function removeMarker(index) {
    if (index >= 0 && index < markers.length) {
        let marker = markers[index];
        map.removeLayer(marker);
        markers.splice(index, 1);
        updateMarkerIndexes();
        let latlng = marker.getLatLng();

        let markerData = {
            lat: latlng.lat,
            lng: latlng.lng,
        };
        deleteMarkerFromDatabase(markerData);
    }
}
function saveMarkerToDatabase(markerData) {
    fetch('/save-marker.php', {
        method: 'POST',
        body: JSON.stringify({ latitude: markerData.lat, longitude: markerData.lng, name: markerData.name })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteMarkerFromDatabase(markerData) {
    fetch('/delete-marker.php', {
        method: 'POST',
        body: JSON.stringify({ latitude: markerData.lat, longitude: markerData.lng })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateMarkerIndexes() {
    markers.forEach(function (marker, index) {
        marker.index = index;
        let popupContent = marker.getPopup().getContent();
        let newPopupContent = popupContent.replace(/removeMarker\(\d+\)/g, "removeMarker(" + index + ")");
        marker.setPopupContent(newPopupContent);

    });
}