// CUSTOM KEYSOFT SCRIPTS

(function($) {

  "use strict";

  // CHECK IF ELEMENT IS IN VIEW
  $.belowthefold = function(element, settings) {
    var fold = $(window).height() + $(window).scrollTop();
    return fold <= $(element).offset().top - settings.threshold;
  };
  $.abovethetop = function(element, settings) {
    var top = $(window).scrollTop();
    return top >= $(element).offset().top + $(element).height() - settings.threshold;
  };
  $.rightofscreen = function(element, settings) {
    var fold = $(window).width() + $(window).scrollLeft();
    return fold <= $(element).offset().left - settings.threshold;
  };
  $.leftofscreen = function(element, settings) {
    var left = $(window).scrollLeft();
    return left >= $(element).offset().left + $(element).width() - settings.threshold;
  };
  $.inviewport = function(element, settings) {
    return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };
  $.extend($.expr[':'], {
    "below-the-fold": function(a, i, m) {
      return $.belowthefold(a, {
        threshold: 0
      });
    },
    "above-the-top": function(a, i, m) {
      return $.abovethetop(a, {
        threshold: 0
      });
    },
    "left-of-screen": function(a, i, m) {
      return $.leftofscreen(a, {
        threshold: 0
      });
    },
    "right-of-screen": function(a, i, m) {
      return $.rightofscreen(a, {
        threshold: 0
      });
    },
    "in-viewport": function(a, i, m) {
      return $.inviewport(a, {
        threshold: 0
      });
    }
  });

  // FORM VALIDATION

  $(".subscribe-form input").jqBootstrapValidation({
    preventSubmit: true,
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      $.ajax({
        success: function() {
          $('#subscribe-success').html("<div class='alert alert-success'>");
          $('#subscribe-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#subscribe-success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#subscribe-success > .alert-success')
            .append('</div>');
        }
      })

    }
  });

  // PRELOADER      
  $(window).load(function() {
    $('#preloader').fadeOut('slow', function() {
      $(this).remove();
    });
  });

  // FEATURES SECTION TABS

  $('#features-tabs').easytabs({
    animationSpeed: 'normal',
    updateHash: false
  });

  // PIE CHARTS

  $(window).on("scroll", function(event) {
    $('.chart:in-viewport').easyPieChart({
      animate: 2000,
      barColor: '#1080f2',
      lineWidth: 3,
      easing: 'easeOutBounce',
      lineCap: 'square',
      size: 230,
      trackColor: false,
      scaleColor: false,
      animate: {
        duration: 1500,
        enabled: true
      }
    });
  });

  //AUTO PLAY YOUTUBE VIDEO

  function autoPlayYouTubeModal() {
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function() {
      var theModal = $(this).data("target"),
        videoSRC = $('#video-modal iframe').attr('src'),
        videoSRCauto = videoSRC + "?autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').on( 'click' , function() {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
      $('.modal').on( 'click' , function() {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
    });
  }
  autoPlayYouTubeModal();

  // TESTIMONIALS SLIDER

  $("#testimonials .slider").owlCarousel({
    navigation: true,
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true
  });

  // CLIENTS SLIDER

  $("#clients .slider").owlCarousel({
    navigation: true,
    pagination: false,
    autoPlay: 5000, //Set AutoPlay to 3 seconds 
    items: 5,
  });

  // MAIN MENU TOGGLE AND SMOOTH SCROLL


  $('.navbar-collapse ul li a').on( 'click' , function() {
    $('.navbar-toggle:visible').click();
  });

  $(function() {
    $('a.page-scroll').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 64
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  });

  $('body').scrollspy({
    offset: 64,
    target: '.navbar-fixed-top'
  });

  // ANIMATED MENU

  // var cbpAnimatedHeader = (function() {

  //   var docElem = document.documentElement,
  //     header = document.querySelector('.navbar-default'),
  //     didScroll = false,
  //     changeHeaderOn = 50;

  //   function init() {
  //     window.addEventListener('scroll', function(event) {
  //       if (!didScroll) {
  //         didScroll = true;
  //         setTimeout(scrollPage, 100);
  //       }
  //     }, false);
  //     window.addEventListener('load', function(event) {
  //       if (!didScroll) {
  //         didScroll = true;
  //         setTimeout(scrollPage, 100);
  //       }
  //     }, false);
  //   }

  //   function scrollPage() {
  //     var sy = scrollY();
  //     if (sy >= changeHeaderOn) {
  //       classie.add(header, 'navbar-shrink');
  //     } else {
  //       classie.remove(header, 'navbar-shrink');
  //     }
  //     didScroll = false;
  //   }

  //   function scrollY() {
  //     return window.pageYOffset || docElem.scrollTop;
  //   }

  //   init();

  // })();
  
})(jQuery);

function stopPropagation(e) {
  e.stopPropagation();
}

function sendAnalyticsDevelopmentRequestEvent(event, service) {
  gtag('event', 'request', {
    'event_category': 'development',
    'event_label': service
  });
}