$(document).ready(function() {

  // Initial hide
  $tweetContainer = $('.new-tweet');
  $tweetContainer.hide();
  const $scrollBut = $('#scroll-up').find('button');
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
    $('html, body').animate({ scrollTop: 0}, function() {
      $scrollBut.hide();
    });
  });

  //when scrolling on tweets! section
  $(document).on('scroll', function() {
    $scrollBut.show();
  });

});



