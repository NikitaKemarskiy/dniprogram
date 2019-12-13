$(document).ready(function(){
  $(".owl-carousel-team").owlCarousel({
  	/*animateOut: 'slideOutDown',
    animateIn: 'flipInX',*/
    margin: 10,
    /*stagePadding: 30,
    smartSpeed: 450,*/
    nav: true,
    responsive : {
      // breakpoint from 0 up
      0 : {
          items: 1
      },
      // breakpoint from 480 up
      480 : {
          items: 2
      },
      // breakpoint from 768 up
      768 : {
          items: 3
      }
    },
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
  });
  $(".owl-carousel-testimonials").owlCarousel({
    items: 1,
    margin: 10,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    nav: true,
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
  });
});