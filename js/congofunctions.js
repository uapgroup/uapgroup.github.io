function declareGlobals() {
    var directionsSearchModeOrigin = "text";
    var directionsSearchModeDestination = "text";
    var routes;

}


declareGlobals();

function searchNearBy(searchstring, lat, lng) {
    ////console.log("search nearby " + searchstring + ' ' + lat + ' ' + lng);
    jQuery("#searchnearbysection").css("display", "");
    jQuery("h1#storesnearyou").css("display", "none");
    jQuery("section#locationsListings").css("display", "none");
    jQuery("section#topmodeandformcontainer").css("display", "none");
}
/**
 * @param lat latitude
 * @param lng longitude
 * @returns void
 */
function clickInfoWindowDirections(lat, lng) {

    ////console.log("info window directions clicked");
    jQuery("h1#storesnearyou").css("display", "none");
    jQuery("section#locationsListings").css("display", "none");
    jQuery("section#searchnearbysection").css("display", "none");
    jQuery("section#topmodeandformcontainer").css("display", "");
    jQuery("section#getDirectionsdiv").css("display", "");
    jQuery("#b").val(" Shop at " + lat + "," + lng);
    jQuery("#destinationLatitude").val(lat);
    jQuery("#destinationLongitude").val(lng);
    directionsSearchModeDestination = "coords";
    jQuery("#originLatitude").val(currentPositionLat);
    jQuery("#originLongitude").val(currentPositionLng);
    jQuery("#a").val(currentPositionLat + "," + currentPositionLng);
    directionsSearchModeOrigin = "coords";
    return false;
}

/**
 * 
 * @param {int} index
 * @returns {void}
 */
function listSteps(routeIndex) {

    var stepCounter;
    var stepHtml;
    jQuery("#suggestedDirections").html("");
    //console.log("no of legs in route 0 " + routes[routeIndex].legs.length);
    //console.log("legs in route 0 " + routes[routeIndex].legs);
    //console.log("waypoint order in route 0 " + routes[routeIndex].waypoint_order);
    //console.log("overview path in route 0 " + routes[routeIndex].overview_path);
    //console.log("bounds in route 0 " + routes[routeIndex].bounds);
    //console.log("copy in route 0 " + routes[routeIndex].copyrights);

    jQuery("#suggestedDirections").html("");

    var start_address = '<section id="pointA">';
    start_address += '<article id="towncityname">' + routes[routeIndex].legs[0].start_address + '</article>';
    start_address += '<article id="countryname">&nbsp;</article>';
    start_address += '</section>';
    jQuery("#suggestedDirections").append(start_address);

    for (var leg = 0; leg < routes[routeIndex].legs.length; leg++) {
        //console.log("at leg " + leg + " has " + routes[routeIndex].legs[leg].steps.length + " steps");
        for (var step = 0; step < routes[routeIndex].legs[leg].steps.length; step++) {
            //console.log("at step " + step + " of leg " + leg + " with instructions " + routes[routeIndex].legs[leg].steps[step].instructions);
            stepCounter = step + 1;
            stepHtml = '<section id="singleDirection" >';
            stepHtml += '<article id="singleDirectiontop"><span id="stepNumber">' + stepCounter + '.</span> ';
            stepHtml += routes[routeIndex].legs[leg].steps[step].instructions;
            stepHtml += '<article id="singleDirectiondistance">';
            stepHtml += '<span id="distanceApproximate">' + routes[routeIndex].legs[leg].steps[step].distance.value + 'm';
            stepHtml += '</span></article>';
            //stepHtml = jQuery('<li>' + routes[routeIndex].legs[leg].steps[step].instructions + '</li>');
            jQuery("#suggestedDirections").append(stepHtml);
        }
    }

    var lastLegIndex = routes[routeIndex].legs.length - 1;
    var end_address = '<section id="pointB">';
    end_address += '<article id="towncityname">' + routes[routeIndex].legs[lastLegIndex].end_address + '</article>';
    end_address += '<article id="countryname">&nbsp;</article>';
    end_address += '</section>';
    jQuery("#suggestedDirections").append(end_address);


    jQuery("#routes").css("display", "");
    jQuery("#routes").css("display", "");
    jQuery("#steps").css("display", "");
}

jQuery(document).ready(function () {

    var shops = new Array();

    var latitude = -4.266667;
    var longitude = 15.283333;
    var map;
    var markers = new Array();
    var infowindows = new Array();
    var infowindow = null;
    var geocoder;
    var transportmode = google.maps.TravelMode.DRIVING;
    var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 6,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var isNigeria = false;
    var closestShopsShown = false;
    var scrollerSet = false;
    var currentPosResponseGiven = false;
    map = new google.maps.Map(document.getElementById("map"),
            mapOptions);


    if (navigator.geolocation) {
        //        //console.log("geolocation is supported");

        var options = {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
                function (pos) {
                    currentPosResponseGiven = true;

                    ////console.log("current location " + pos.coords.latitude + "," + pos.coords.longitude);

                    currentPositionLat = pos.coords.latitude;
                    currentPositionLng = pos.coords.longitude;
                    var currentPosLatLng = new google.maps.LatLng(currentPositionLat, currentPositionLng);

                    geocoder = new google.maps.Geocoder();

                    geocoder.geocode({ latLng: currentPosLatLng }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results) {
                                //                                infowindow.setContent(results[1].formatted_address);
                                //                                //console.log("results ");
                                //                                //console.log(results);
                                for (k = 0; k <= results.length - 1; k++) {
                                    //                                    //console.log("address components for results " + k);
                                    //                                    //console.log(results[k].address_components !== undefined);
                                    //                                    if (results[k].address_components !== undefined) {
                                    //                                        for (i = 0; i <= results[k].address_components.length - 1; i++) {
                                    //                                            //console.log("types for results " + k + ", address components " + i);
                                    //                                            //console.log(results[k].address_components[i].types !== undefined);
                                    //                                            if (results[k].address_components[i].types !== undefined) {
                                    //                                                for (j = 0; j <= results[k].address_components[i].types.length - 1; j++) {
                                    //                                                    if (results[k].address_components[i].types[j] === "country") {
                                    //                                                        //console.log("is country");
                                    //                                                        //console.log("long name for results " + k + ", address components " + i + ", types " + j);
                                    //                                                        //console.log(results[k].address_components[i].types[j].long_name !== undefined)
                                    //                                                        if (results[k].address_components[i].types[j].long_name !== undefined) {
                                    if (results[k].formatted_address === "Nigeria") {
                                        //                                                                //console.log("is nigeria");
                                        isNigeria = true;
                                        if (closestShopsShown === false) {
                                            closestShopsShown = true;
                                            clearShops();
                                            closestShops(new google.maps.LatLng(currentPositionLat, currentPositionLng));
                                            map.setCenter(new google.maps.LatLng(currentPositionLat, currentPositionLng));
                                            map.setZoom(12);
                                            showShops();
                                        }
                                    }
                                    //                                                        } //
                                    //                                                    }
                                    //                                                }
                                    //                                            }
                                    //                                        }
                                    //                                    }
                                }

                            }
                        } else {
                            ////console.log("Geocoder failed due to: " + status);
                        }

                        if (closestShopsShown === false) {
                            clearShops();
                            loadShops();
                            showShops();
                        }

                    });
                },
                function () {
                    currentPosResponseGiven = true;
                    //                    //console.log("getposition error");
                    clearShops();
                    loadShops();
                    showShops();
                    jQuery("#a").focus();
                    directionsSearchModeOrigin = "text";
                },
                options
                );
    }
    else {
        ////console.log("geolocation not supported");
        clearShops();
        loadShops();
        showShops();
    }

    if (currentPosResponseGiven === false) {
        clearShops();
        loadShops();
        showShops();
    }

    function clearShops() {

        jQuery("#locationsListings ul").html("");

        if (shops.length === 0 && markers.length === 0) {
            return false;
        }

        ////console.log("Clearing ahops: There are " + shops.length + " shops");
        if (markers.length > 0) {
            for (i = 0; i <= markers.length - 1; i++) {

                markers[i].setMap(null);
            }
        }

        shops = new Array();

        return false;
    }

    function loadShops() {
        shops = [
{ title: "UAP RDC, sprl - courtier", description: "assurances/insurance brokers      Bureau nÂ° 3-0-B12, Kavali Center, nÂ° 10/13       Croisement Av. Mutombo Katshi et    Equateur Kinshasa/ Gombe, RDC, uapdrc@uap-group.com", lat: "-4.336480", lng: "15.268188", index: 4, openingtime: "Mobile: + 254 711 065000", closingtime: "Tel +243 975 33 88 33" }
        ];
    }

    function searchShops() {
        //console.log("searching shops...");
        var address = jQuery("input[name='location']").val();
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address, componentRestrictions: { country: "ke" } }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                //console.log(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                var closestshops = closestShops(results[0].geometry.location);
            } else {
                //console.log("Geocode was not successful for the following reason: " + status);
            }

            for (i = 0; i < results.length; i++) {
                //console.log("results " + results[i]);
            }
        });
        return false;
    }

    /**
     * 
     * @param maps.google.LatLng} location
     * @returns {undefined}
     */
    function closestShops(location) {

        loadShops();
        var closestshops = new Array();
        var latitude_distance = 111; //km
        var longitude_distance = 100; //km
        var locationLat = location.lat();
        var locationLng = location.lng();

        for (var i = 0; i <= shops.length - 1; i++) {
            //console.log("At shop " + i);
            var lat = shops[i].lat;
            var lng = shops[i].lng;

            //console.log("lat " + lat);
            //console.log("lng " + lng);

            var shopLatDistance = (locationLat - lat) * latitude_distance;
            var shopLngDistance = (locationLng - lng) * longitude_distance;

            //console.log("lat distance " + shopLatDistance);
            //console.log("lng distance " + shopLngDistance);

            var totalDistance = shopLatDistance + shopLngDistance;
            //console.log("total distance " + totalDistance);
            if (Math.abs(totalDistance) < 10) {
                //console.log("is close");
                closestshops.push(shops[i]);
            }
        }

        //console.log("returning " + closestshops.length + " shops");
        clearShops();
        shops = closestshops;
        showShops();

        //return closestshops;
    }

    /**
     * 
     * @param {string} openingTime
     * @param {string} closingTime
     * @returns {boolean}
     */

    function shopIsOpen(openingTime, closingTime) {

        var currentTime = new Date();
        var shopOpeningTime = new Date();
        var shopClosingTime = new Date();

        var shopOpeningArray = openingTime.split(":");
        var shopOpeningHour = shopOpeningArray[0];
        var shopOpeningMin = shopOpeningArray[1];

        shopOpeningTime.setHours(shopOpeningHour);
        shopOpeningTime.setMinutes(shopOpeningMin);

        var shopClosingArray = closingTime.split(":");
        var shopClosingHour = shopClosingArray[0];
        var shopClosingMin = shopClosingArray[1];

        shopClosingTime.setHours(shopClosingHour);
        shopClosingTime.setMinutes(shopClosingMin);

        //console.log("current time " + currentTime.getHours() + ":" + currentTime.getMinutes());

        return currentTime > shopOpeningTime && currentTime < shopClosingTime;


    }

    /**
     * 
     * @param {int} index
     * @returns {void}
     */
    function createInfoWindow(index) {

        var clickedShop = shops[index];

        var shopIsOpenText, isOpenClass;
        if (shopIsOpen(clickedShop.openingtime, clickedShop.closingtime)) {
            //console.log("shop is open");
            shopIsOpenText = "OPEN";
            isOpenClass = "openWord";
        }
        else {
            //console.log("shop is closed");
            //shopIsOpenText = "CLOSED";
            isOpenClass = "closeWord";
        }

        var infoWindowHtml;
        infoWindowHtml = '<div id="mapMarker">';
        infoWindowHtml += '<h6>' + clickedShop.title + '</h6>';
        infoWindowHtml += '<p>' + clickedShop.description + '</p>';

        infoWindowHtml += '<div id="openingContainer">';
        infoWindowHtml += '<div id="' + isOpenClass + '">' + shopIsOpenText + '</div>';
        infoWindowHtml += '<div id="openTime">' + clickedShop.openingtime + ' </div> ';
        infoWindowHtml += '<div id="closeTime">' + clickedShop.closingtime + ' </div> ';
        infoWindowHtml += '</div>';
        infoWindowHtml += '<div id="markerlinks"><ul><li>';
        infoWindowHtml += '<a href="#" onclick="top.clickInfoWindowDirections(' + clickedShop.lat + ',' + clickedShop.lng + ');">Directions</a></li>';
        infoWindowHtml += '</ul></div></div>';

        return infoWindowHtml;
    }

    function showShops() {
        ////console.log("Showing shops " + shops.length);
        var myLatLng;
        var marker;
        var shop;
        var markerlatlng;
        var shopIsOpenText, isOpenClass;
        var infoWindowHtml;
        var oddListing;
        var sidelinks;
        for (var i = 0; i <= shops.length - 1; i++) {

            shop = shops[i];
            ////console.log("Shop " + i);
            ////console.log("latitude " + shop.lat);
            myLatLng = new google.maps.LatLng(shop.lat, shop.lng);
            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: shop.title,
                zIndex: i,
                icon: "images/pin.png"
            });
            ////console.log("marker "+i+" "+marker);
            google.maps.event.addListener(marker, 'click', function () {

                var markerlatlng = marker.getPosition();
                ////console.log("marker clicked at " + markerlatlng.lat() + "," + markerlatlng.lng());
                if (infowindow) {
                    //console.log("infowindow is open");
                    infowindow.close();
                }
                else {
                    //console.log("infowindow is not open");
                }

                //console.log("setting infowindow html to " + shops[this.getZIndex()][1]);

                infoWindowHtml = createInfoWindow(this.getZIndex());

                jQuery("#infowindow div").html(infoWindowHtml); //(shops[this.getZIndex()][1]);
                //jQuery("#infowindow").css("display", "");

                infowindow = new google.maps.InfoWindow({
                    content: document.getElementById("infowindow").innerHTML
                });
                infowindow.open(map, this);
            });
            markers[i] = marker;
            //var shopIsOpenText, isOpenClass;
            if (shopIsOpen(shop.openingtime, shop.closingtime)) {
                shopIsOpenText = "OPEN";
                isOpenClass = "openWord";
            }
            else {
                shopIsOpenText = "CLOSED";
                isOpenClass = "closeWord";
            }


            //                                <div id="singleStorecontainer">
            //                                    <h6>Shop</h6>
            //                                    <p>Silverbird Galleria, 133, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria</p>
            //                                    <div id="openingContainer">
            //                                        <div id="openWord">OPEN</div>
            //                                        <div id="openTime">8:00 AM to 9:00 PM</div>
            //                                    </div>
            //                                </div>
            //                            </li>

            oddListing = "";
            if ((i % 2) === 0)
                oddListing = 'class="oddListing"';
            sidelinks = '<li ' + oddListing + '>';
            sidelinks += '<div data-zindex="' + i + '" class="singleStorecontainer">';
            //sidelinks += '<a data-zindex="' + i + '" href="#">';
            sidelinks += '<h6>' + shop.title + '</h6>';
            sidelinks += '<p>' + shop.description + '</p>';
            sidelinks += '<div id="openingContainer"><div id="' + isOpenClass + '">' + shopIsOpenText + '</div><div id="openTime">' + shop.openingtime + ' </div><div id="openTime"> ' + shop.closingtime + '</div></div>';
            //sidelinks += '</a>';
            sidelinks += '</div>';
            sidelinks += '</li>';
            jQuery("#locationsListings ul").append(sidelinks);
        }

        jQuery(".singleStorecontainer").click(function () {
            ////console.log("shop list item clicked");
            var zIndex = jQuery(this).data("zindex");
            ////console.log("it's zindex is " + zIndex);
            if (infowindow) {
                ////console.log("the info window is open");
                infowindow.close();
            }
            else {
                ////console.log("the infowindow is closed");
            }

            infowindow = new google.maps.InfoWindow({
                content: createInfoWindow(zIndex) //"<div>" + shops[zIndex][1] + "</div>"
            });
            ////console.log("marker is " + markers[zIndex]);
            ////console.log("marker z index is " + markers[zIndex].getZIndex());
            infowindow.open(map, markers[zIndex]);
        });

        if (scrollerSet === false) {
            jQuery("#storelocatorcontentright").mCustomScrollbar({
                scrollButtons: {
                    enable: true
                }
            });
            scrollerSet = true;
        }

        return false;
    }

    $(".storesearch").submit(function (e) {

        e.preventDefault();
        ////console.log("location " + jQuery("#location").val());
        if (jQuery("#location").val().length == 0) {
            return false;
        }
        searchShops();
        jQuery("#resetsearch").css("display", "");
        return false;
    });

    jQuery("div#directions").css("display", "none");
    jQuery("#topmodeandformcontainer").css("display", "none");
    jQuery("#searchnearbysection").css("display", "none");
    jQuery("#getDirectionsdiv").css("display", "none");
    jQuery("div#infowindow").css("display", "none");
    jQuery("div#routes").css("display", "none");
    jQuery("div#steps").css("display", "none");
    //                        jQuery("a.directions").click(function() {
    //                            //console.log("directions clicked...");
    //                            jQuery("div#stores").css("display", "none");
    //                            jQuery("div#directions").css("display", "");
    //                            return false;
    //                        });

    jQuery("#a").change(function () {
        directionsSearchModeOrigin = "text";
        //console.log("origin search values changed");
    });

    jQuery("#b").change(function () {
        directionsSearchModeDestination = "text";
        //console.log("destination search values changed");
    });

    function distanceToSentence(distanceInMeters) {
        //console.log("distance To Sentence " + distanceInMeters);
        if (distanceInMeters === 0) {
            return "0m";
        }
        var km = Math.floor(distanceInMeters / 1000);
        //console.log("km " + km);
        var m;
        if (km > 0)
            m = Math.abs((km * 1000) - distanceInMeters);
        else
            m = distanceInMeters;
        //console.log("meters " + m);
        var sentence = "";
        if (km > 0)
            sentence += km + "km";
        if (km <= 0)
            sentence += " " + m + "m";
        //console.log("sentence " + sentence);
        return sentence;
    }

    jQuery("#resetsearch").click(function () {
        clearShops();
        if (isNigeria === true) {
            closestShops(new google.maps.LatLng(currentPositionLat, currentPositionLng));
            map.setCenter(new google.maps.LatLng(currentPositionLat, currentPositionLng));
            map.setZoom(12);
        }
        else {

            loadShops();
            map.setCenter(new google.maps.LatLng(defaultPositionLat, defaultPositionLng));
            map.setZoom(6);
        }
        showShops();
        jQuery(this).css("display", "none");
        jQuery("#location").val("");
        return false;
    });

    //jQuery("#directions form").submit(function() {
    jQuery("#directionget").click(function () {
        //console.log("get directions form submitted");
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        directionsDisplay.setMap(map);
        var origin;
        if (directionsSearchModeOrigin === "coords") {
            origin = new google.maps.LatLng(jQuery("#originLatitude").val(), jQuery("#originLongitude").val());
        }
        else if (directionsSearchModeOrigin === "text") {
            origin = jQuery("#a").val();
        }
        var destination;
        if (directionsSearchModeDestination === "coords") {
            destination = new google.maps.LatLng(jQuery("#destinationLatitude").val(), jQuery("#destinationLongitude").val());
        }
        else if (directionsSearchModeDestination === "text") {
            destination = jQuery("#b").val();
        }
        var request = {
            origin: origin,
            destination: destination,
            travelMode: transportmode,
            provideRouteAlternatives: true
        };


        //console.log("the request origin " + request.origin);
        //console.log("the request destination " + request.destination);
        //console.log("the request travel mode " + request.travelMode);
        directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {

                //console.log("response status " + status);
                //console.log("response result " + result);
                directionsDisplay.setDirections(result);
                //              directionsDisplay.setPanel(document.getElementById("routes"));

                //console.log("How many routes? " + result.routes.length);

                routes = result.routes;

                var totalDistance = new Array(), totalTime = new Array();
                var durationStr = new Array();

                for (var i = 0; i < result.routes.length; i++) {
                    totalDistance[i] = 0;
                    totalTime[i] = 0;
                    durationStr[i] = "";
                    for (var leg = 0; leg < result.routes[i].legs.length; leg++) {
                        //console.log('distance ' + leg + ' ' + result.routes[i].legs[leg].distance.value);
                        //console.log('duration ' + leg + ' ' + result.routes[i].legs[leg].duration.value);
                        totalDistance[i] += result.routes[i].legs[leg].distance.value;
                        totalTime[i] += result.routes[i].legs[leg].duration.value;
                    }
                    var totalSec = totalTime[i]; // new Date().getTime() / 1000;
                    var hours = parseInt(totalSec / 3600) % 24;
                    var minutes = parseInt(totalSec / 60) % 60;
                    var seconds = totalSec % 60;

                    durationStr[i] = (hours < 1 ? "" : hours + "hrs") + " " + (minutes < 1 ? "" : minutes + "mins") + " " + (seconds < 1 ? "" : seconds + "s");

                }

                jQuery("#suggestedrouteBottom").html("");
                jQuery("#suggestedrouteBottom").append('<section id="directionsTitle">Directions to  Shops</section>');
                var routeCounter;
                var routeHtml;
                for (var i = 0; i < result.routes.length; i++) {
                    routeCounter = i + 1;
                    var oddRoute = '';
                    if ((routeCounter % 2) === 0)
                        oddRoute = 'oddRoute';
                    routeHtml = '<section onclick="listSteps(' + i + ');" data-routeIndex="' + i + '" href="#" class="singleRoute ' + oddRoute + '">';
                    routeHtml += '<section id="singleway">Route ' + routeCounter + '</section>';
                    routeHtml += '<section id="singledistance">' + distanceToSentence(totalDistance[i]) + ', ' + durationStr[i] + '</section>';
                    routeHtml += '</section>';
                    //jQuery('<li><a href="" data-id="' + i + '">Route ' + routeCounter + '</a></li>');
                    jQuery("#suggestedrouteBottom").append(routeHtml);
                }

                listSteps(0);
            }
            else {
                //console.log("response status " + status);
                //console.log("response result " + result);
            }
        });
        return false;
    });

    jQuery(".singleRoute").click(function () {
        //console.log("singleroute clicked " + jQuery(this).data("routeIndex"));
        listSteps(jQuery(this).data("routeIndex"));
        return false;
    });

    jQuery('.mode').click(function () {

        //jQuery('.categorymode').hide();
        //jQuery('#' + jQuery(this).attr('name')).show();
        transportmode = google.maps.TravelMode[jQuery(this).data("name")];
        //console.log("transport mode changed to "+transportmode);

    });
});