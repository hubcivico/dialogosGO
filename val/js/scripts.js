$(document).ready(function () {
    /***************** GMAPS ******************/
    function initialize() {

        var mapCanvas = document.getElementById('mapamain');
        var myLatlng = new google.maps.LatLng(39.499590, -0.650940);
        var mapOptions = {
            center: myLatlng,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var infowindow = new google.maps.InfoWindow();


        /*
        var csvData = $.ajax({
            type: "GET",
            url: "http://cors.io/?u=https://docs.google.com/spreadsheets/d/1GiHUiTeJ3L1BDNNKOfJMExnPLOn470gl-8eXvZrtohM/pub?gid=1493741743&single=true&output=csv",
            crossDomain:true,
            dataType: "csv",
            success: function (result) {
                console.log("HOLA");
                alert(result);
                alert("done!"+ csvData.getAllResponseHeaders())
            },
        });
        */

        $.get('https://crossorigin.me/https://docs.google.com/spreadsheets/d/1GiHUiTeJ3L1BDNNKOfJMExnPLOn470gl-8eXvZrtohM/pub?gid=1493741743&single=true&output=csv', function(data) {
            processData(data);
        });

        function processData(allText) {
            var allTextLines = allText.split(/\r\n|\n/);
            var headers = allTextLines[0].split(',');
            var lines = [];

            for (var i=1; i<allTextLines.length; i++) {
                var data = allTextLines[i].split(',');
                console.log("DATARAW "+data );
                var org = data[1];
                var fecha = data[2];
                var loc = data[3];
                var lat = data[4].replace(/,/g, '.');
                var lon = data[5].replace(/,/g, '.');
                var val = data[6];
                //var txt = data[7];
                var latlong = new google.maps.LatLng(lat, lon);
                console.log("LATLONG:"+latlong);
                console.log("LAT: "+lat);
                console.log("LON: "+lon);
                var marker = new google.maps.Marker({
                    map: map,
                    position: latlong
                });
                marker.setMap(map);

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(
                        '<div>' +
                        '<strong> Organizador: </strong>'+org+'<br>' +
                        '<strong>Fecha: </strong>'+fecha+'<br>' +
                        '<strong>Ubicación: </strong>'+loc+'<br>' +
                        '<strong>Valoración: </strong>'+val+'<br>' +
                        '</div>'
                    );
                    infowindow.open(map, this);
                });

            }
        }


    }

    google.maps.event.addDomListener(window, 'load', initialize);

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInDown');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated bounceInDown');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInDown');
    }, {
        offset: '75%'
    });

    /***************** Flickity ******************/

    $('#featuresSlider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false
    });

    $('#showcaseSlider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        imagesLoaded: true
    });

    /***************** Fancybox ******************/

    $(".youtube-media").on("click", function (e) {
        var jWindow = $(window).width();
        if (jWindow <= 768) {
            return;
        }
        $.fancybox({
            href: this.href,
            padding: 4,
            type: "iframe",
            'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
        });
        return false;
    });

});

$(document).ready(function () {
    $("a.single_image").fancybox({
        padding: 4,
    });
});

/***************** Nav Transformicon ******************/

/* When user clicks the Icon */
$(".nav-toggle").click(function () {
    $(this).toggleClass("active");
    $(".overlay-dialegs").toggleClass("open");
});

/* When user clicks a link */
$(".overlay ul li a").click(function () {
    $(".nav-toggle").toggleClass("active");
    $(".overlay-dialegs").toggleClass("open");
});

/* When user clicks outside */
$(".overlay").click(function () {
    $(".nav-toggle").toggleClass("active");
    $(".overlay-dialegs").toggleClass("open");
});

/***************** Smooth Scrolling ******************/

$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 2000);
            return false;
        }
    }
});
