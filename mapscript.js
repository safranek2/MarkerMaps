let map;
let markers = [];
let currentMarker = null;

map = L.map('map').setView([49.74369357397428, 15.338693012913026], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© 2023 SPŠE Ječná by David Šafránek, Jakub Svoboda, Ondřej Šembera'
}).addTo(map);

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
        ).off('click')
        .openPopup();

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

function removeMarker(index) {
    if (index >= 0 && index < markers.length) {
        let marker = markers[index];
        map.removeLayer(marker);
        markers.splice(index, 1);
        updateMarkerIndexes();
    }
}

function updateMarkerIndexes() {
    markers.forEach(function (marker, index) {
        marker.index = index;
        let popupContent = marker.getPopup().getContent();
        let newPopupContent = popupContent.replace(/removeMarker\(\d+\)/g, "removeMarker(" + index + ")");
        marker.setPopupContent(newPopupContent);
    });
}

function saveMarker(id, marker) {
    let markerNameInput = document.getElementById(`marker${id}`);
    let markerName = markerNameInput.value;

    if (markerName) {
        let index = marker.index;
        marker.setPopupContent(
            `<div class="text-center"><p style="margin-bottom: 0;">${markerName}</p><button type="button" class="btn btn-sm btn-link" onclick="removeMarker(${index})">DELETE</button></div>`,
            {
                closeButton: true
            }
        )

        let latlng = marker.getLatLng();

        let markerData = {
            lat: latlng.lat,
            lng: latlng.lng,
            name: markerName
        };
    } else {
        removeMarker(marker.index);
    }
    currentMarker = null;
}