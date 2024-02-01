/* global $ document*/
$(document).ready(function() {

  const $errorContainer = $('.error-container');
  const $tweetContainer = $('.new-tweet');
  const $scrollBut = $('#scroll-up').find('button');
  const $textArea = $('#tweet-text');

  // Initial hide
  $tweetContainer.hide();
  $scrollBut.hide();

  // Top right button for new tweets
  const $button = $('#right-Nav');
  $button.on("click", function() {
    if (!$tweetContainer.is(':visible')) {
      // if not visible, slide down
      $tweetContainer.slideDown();
      $textArea.focus();
    } else {
      // if visible slide up
      $tweetContainer.slideUp();
      if ($errorContainer.is(':visible')) {
        $errorContainer.slideUp();
      }
    }
  });

  // Bottom right button to scroll back
  $scrollBut.on("click", function() {
    $('html, body').animate({ scrollTop: 0});
  });

  // When scrolling past a certain Pix value either fade in/out elements
  $(document).bind("scroll.myScroll", function() {
    if ($(document).scrollTop() >= 200) {
      $scrollBut.fadeIn();
      $('#right-Nav').fadeOut();
    } else {
      $scrollBut.fadeOut();
      $('#right-Nav').fadeIn();
    }
  });
});



