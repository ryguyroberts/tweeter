$(document).ready(function() {

  const $tweetContainer = $('.new-tweet');
  const $scrollBut = $('#scroll-up').find('button');

  // Initial hide
  $tweetContainer.hide();
  $scrollBut.hide();

  // Top right button for new tweets
  const $button = $('#right-Nav')
  $button.on("click", function() {
    if (!$tweetContainer.is(':visible')) {
      // if not visible, slide down
      $tweetContainer.slideDown();
    } else {
      // if visible slidup
      $tweetContainer.slideUp();
    }
  })

  // Bottom right button to scroll back
  $scrollBut.on("click", function() {
    $('html, body').animate({ scrollTop: 0});
  });

  // When scrolling past a certain Pix value either fade in/out elements
  $(document).bind("scroll.myScroll", function(){    
    if ($(document).scrollTop() >= 200) {
        $scrollBut.fadeIn();
        $('#right-Nav').fadeOut();
    } else {
      $scrollBut.fadeOut();
      $('#right-Nav').fadeIn();
    }
  });
});



