$(document).ready(function () {

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


/***************** GMAPS ******************/

$(document).ready(function () {


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
        //TESTING var rscUrl = 'https://crossorigin.me/https://docs.google.com/spreadsheets/d/1l80cVW6pSJ6Y36VbS5p6f2c6GXcditBOfaiXABnF8sc/pub?gid=1493741743&single=true&output=csv';
        var rscUrl = 'https://crossorigin.me/https://docs.google.com/spreadsheets/d/1GiHUiTeJ3L1BDNNKOfJMExnPLOn470gl-8eXvZrtohM/pub?gid=1493741743&single=true&output=csv';

        Papa.parse(rscUrl, {
            download: true,
            header: true,
            dynamicTyping: true,
            encoding: 'utf8',
            skipEmptyLines: true,
            complete: function processRow(results){
                for(var i=0; i<results.data.length; i++){
                    var row = results.data[i];
                    if(row.ID){
                        var org = row.ORGANIZA;
                        var fecha = row.FECHA;
                        var loc = row.LUGAR;
                        var lat = row.LAT;
                        var lon = row.LON;
                        var val = row.VALORACION;
                        var url = row.URLPDF;
                        console.log(org);
                        var latlong = new google.maps.LatLng(lat, lon);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: latlong

                        });
                        generateWindow(marker, org, fecha, loc, val, url);

                    }
                }
            }
        });

        function generateWindow(marker, org, fecha, loc, val, url){
            var stars = '';
            for(var i=0; i<val; i++){
                stars = stars + '<i class="fa fa-star"></i>';
            }
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(
                    '<div class="map-window">' +
                    '<strong> Organizador: </strong>'+org+'<br>' +
                    '<strong>Fecha: </strong>'+fecha+'<br>' +
                    '<strong>Ubicación: </strong>'+loc+'<br>' +
                    '<strong>Valoración: </strong>'+stars+'<br>' +
                    '<a href="'+url+'" target="_blank" class="use-btn maping">Informe</a>'+
                    '</div>'
                );
                infowindow.open(map, this);
            });
            marker.setMap(map);
        }

    }

    google.maps.event.addDomListener(window, 'load', initialize);

});




