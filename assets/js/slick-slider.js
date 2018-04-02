jQuery(function($) {
    $('#slider-slick').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        variableWidth: true,
        nextArrow: "<button class='slider-button slider-next-button'></button>",
        prevArrow: "<button class='slider-button slider-prev-button'></button>",
        customPaging: function(slider, i) {
            var thumb = $(slider.$slides[i]).data('thumb');
            return ' <button class="slider-button-nav"> </button> ';
        }
    });
});