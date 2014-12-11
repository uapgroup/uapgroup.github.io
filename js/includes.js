$(document).ready(function() {

    /* TRANSPORT MODE */

    /*
     $('.mode').click(function() {
     
     $('.categorymode').hide();
     $('#' + $(this).attr('name')).show();
     
     });
     
     */


    $("#transportmode .mode").click(function() {

        $(this).siblings().removeClass('active')
        $(this).addClass('active');

    })

    $('#routeMorearrowHide').click(function() {
        $('#suggestedrouteBottom').slideUp();
        $('#routeMorearrowShow').show();
        $('#routeMorearrowHide').hide();
    });

    $('#routeMorearrowShow').click(function() {
        $('#suggestedrouteBottom').slideDown();
        $('#routeMorearrowShow').hide();
        $('#routeMorearrowHide').show();
    });

    $('.closetransport').click(function() {
        //$('#topmodeandformcontainer').fadeOut();

        jQuery("h1#storesnearyou").css("display", "");
        jQuery("section#locationsListings").css("display", "");
        jQuery("section#topmodeandformcontainer").css("display", "none");
        jQuery("section#getDirectionsdiv").css("display", "none");
        jQuery("section#searchnearbysection").css("display", "none");
    });



    /* TRANSPORT MODE */

    /* MAP */
    /*
     var locations = [
     ['<div id="mapMarker"><h6>Airtel Shop</h6><p>Silverbird Galleria, 133, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria</p><div id="openingContainer"><div id="openWord">OPEN</div><div id="openTime">8:00 AM to 9:00 PM</div></div><div id="markerlinks"><ul><li><a href="#">Directions</a></li><li>|</li><li><a href="#">Search nearby</a></li></ul></div></div>', 6.431111, 3.415833, 1],
     ['<div id="mapMarker"><h6>Airtel Shop</h6><p>Silverbird Galleria, 133, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria</p><div id="openingContainer"><div id="openWord">OPEN</div><div id="openTime">8:00 AM to 9:00 PM</div></div><div id="markerlinks"><ul><li><a href="#">Directions</a></li><li>|</li><li><a href="#">Search nearby</a></li></ul></div></div>', 6.441111, 3.415833, 2]
     ];
     
     var map = new google.maps.Map(document.getElementById('map-canvas'), {
     zoom: 12,
     center: new google.maps.LatLng(6.431111, 3.41),
     mapTypeId: google.maps.MapTypeId.ROADMAP
     });
     
     var infowindow = new google.maps.InfoWindow();
     
     var marker, i;
     
     for (i = 0; i < locations.length; i++) {
     marker = new google.maps.Marker({
     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
     icon: "images/pin.png",
     map: map
     });
     
     google.maps.event.addListener(marker, 'click', (function(marker, i) {
     return function() {
     infowindow.setContent(locations[i][0]);
     icon: "images/pin.png";
     infowindow.open(map, marker);
     }
     })(marker, i));
     }
     */
    /* MAP  */
});