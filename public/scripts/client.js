/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Load Document appent tweet.
// $(document).ready(function() {
//   loadtweets(function(data) {
//     renderTweets(data);
//   })
// });
// new doc readu
// $(() => {});
$(document).ready(function() {
  //Initialize error and hide, so it has a height for first slidedown event
  const errorContainer = $('.error-container');
  errorContainer.hide();

  //Load tweets initially
  loadAndRenderTweets();
 
  // Listener event on form Submit
  const $form = $('#new-tweet');
    $form.submit(function(event) {
      const inputTextField = $form.find('textarea#tweet-text')
      
      // Error path input empty
      if (inputTextField.val() === "") {
        event.preventDefault();
        const errorMsg = createErrorElement("empty");
        slideError(errorMsg);

      // Error path over 140 chars
      } else if(inputTextField.val().length > 140) {
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
          //function that runs after ajax post sent
          // Clear form
          inputTextField.val("");
          //Reset char to 0
          const counterElement = $form.find('.counter')
          counterElement.text(0);
          //Re-enable button
          $form.find(':submit').prop('disabled', false);
          //fetch new data here
          loadAndRenderTweets();
        });
      }
    });
});

// HTML outline return
const createTweetElement = function(tweetData) {
  const safeHTML = santitizeText(tweetData.content.text);
  return `
  <article class ="tweet">
          <header>
            <div>
            <img src=${tweetData.user.avatars}$>
            <p>${tweetData.user.name}</p>
            </div>
            <p class ="handle">${tweetData.user.handle}</p>
          </header>
          <p class ="tweet-bod">${safeHTML}</p>
          <footer>
            <p>${timeago.format(tweetData.created_at)}</p>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
  `
};

// Error HTML outline
const createErrorElement = function(str) {
  if (str === "empty") {
    return `
    <p><i class="fa-solid fa-triangle-exclamation"></i> Tweet cannot be empty! <i class="fa-solid fa-triangle-exclamation"></i></i></p>
  `
  }
  if (str === "overChar") {
    return `
    <p><i class="fa-solid fa-radiation"></i>Tweet cannot be over 140 Chars!<i class="fa-solid fa-radiation"></i></p>
  `
  }
}

// Slide error logic
const slideError = function(errorMsg) {
  const errorContainer = $('.error-container');
  
  if (!errorContainer.is(':visible')) {
    // if not visible, clear prior state, set content and then slidedown
    errorContainer.html(errorMsg).slideDown();

  } else {
    // if visible just want to update the error
    errorContainer.html(errorMsg)
  }
}

// Load and render tweets
const loadAndRenderTweets = function() {
  loadtweets(function(data) {
    renderTweets(data);
  });
}

// RenderTweets
const renderTweets = function(arrTweetObj) {
  //Because of two loads(Submit on initial) clear before rendering
  $('#tweets-container').empty();

  for (const tweet of arrTweetObj) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

const loadtweets = function(callback) {
  $.get("/tweets", function(data, status) {
    callback(data);
  })
};

// escape
const santitizeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

