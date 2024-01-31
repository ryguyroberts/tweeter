$(document).ready(function() {

  // Initial hide
  $tweetContainer = $('.new-tweet');
  $tweetContainer.hide();

  const $button = $('#right-Nav')
  $button.on("click", function() {
    const errorContainer = $('.error-container');
    if (!$tweetContainer.is(':visible')) {
      // if not visible, slide down
      $tweetContainer.slideDown();
    } else {
      // if visible slidup
      $tweetContainer.slideUp();
    }
  })
});
