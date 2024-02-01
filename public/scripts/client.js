/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* global $ document timeago*/

$(document).ready(function() {
  //Initialize error container and hide, so it has a height for first slidedown event
  const $errorContainer = $('.error-container');
  $errorContainer.hide();

  //Load tweets initially
  loadAndRenderTweets();
 
  // Listener event on form Submit
  const $form = $('#new-tweet');
  $form.submit(function(event) {
    const inputTextField = $form.find('textarea#tweet-text');
    
    // Error path input empty
    if (inputTextField.val() === "") {
      event.preventDefault();
      const errorMsg = createErrorElement("empty");
      slideError(errorMsg);
  
    // Error path over 140 chars
    } else if (inputTextField.val().length > 140) {
      event.preventDefault();
      const errorMsg = createErrorElement("overChar");
      slideError(errorMsg);

    } else {
      // No more refresh & Disable button for now for duplicate clicks, slide error back
      $('.error-container').slideUp();
      event.preventDefault();
      $form.find(':submit').prop('disabled', true);

      const formData = $form.serialize();

      $.post("/tweets/", formData, function() {
        //functions that runs after ajax post sent
        // Clear form
        inputTextField.val("");
        //Reset char to 140
        const counterElement = $form.find('.counter');
        counterElement.text(140);
        //Re-enable button
        $form.find(':submit').prop('disabled', false);
        //fetch new data here
        loadAndRenderTweets();
      });
    }
  });
});