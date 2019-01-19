
var mapObject = document.getElementById("map");

// Check if Geolocation is supported
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        mapObject.innerHTML = "Geolocation is not supported by this browser.";
    };
};
getLocation();
function getTasks() {
    $.get('/tasks', function (data) {
        console.log(data)
    })
}
// Show current user location
function showPosition(position) {


    var locations = [
        ['User 1', position.coords.latitude, position.coords.longitude, 4],
        ['User 2', position.coords.latitude - .0010, position.coords.longitude + .0010, 5],
        ['User 3', position.coords.latitude + .0020, position.coords.longitude + .0015, 3],
        ['User 4', position.coords.latitude - .0030, position.coords.longitude + .0030, 2],
        ['User 5', position.coords.latitude - .0031, position.coords.longitude - .0025, 1]
    ];
    console.log(locations);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
};

// Error Handeling
//     }, function () {
//       handleNoGeolocation(true);
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleNoGeolocation(false);
//   }

//   // var infowindow = new google.maps.Infowindow({
//   //   content: "Task"
//   // });
// }





