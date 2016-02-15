$(document).ready(function () {
    /***************** GMAPS ******************/
    function initialize() {
        var mapCanvas = document.getElementById('mapamain');
        var myLatlng = new google.maps.LatLng(39.499590, -0.650940);
        var myLatlng2 = new google.maps.LatLng(38.978698, 1.40);
        var mapOptions = {
            center: myLatlng,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var infowindow = new google.maps.InfoWindow();


        /***marker1***/
        /*
         var marker = new google.maps.Marker({
         map: map,
         position: myLatlng
         });

         var marker2 = new google.maps.Marker({
         map: map,
         position:myLatlng2
         });

         marker.setMap(map);
         marker2.setMap(map);

         google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(
         '<div>' +
         '<strong> Paseo en bici por la costa </strong><br>' +
         'Hora: 18:30 <br>' +
         '<a href="evento.html" class="button">Más Información</a>'+
         '</div>'
         );
         infowindow.open(map, this);
         });

         google.maps.event.addListener(marker2, 'click', function() {
         infowindow.setContent(
         '<div>' +
         '<strong> Conoce el bosque mediterráneo </strong><br>' +
         'Hora: 15:30 <br>' +
         '<a href="evento2.html" class="button">Más Información</a>'+
         '</div>'
         );
         infowindow.open(map, this);
         });
         */


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
