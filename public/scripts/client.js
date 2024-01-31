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

$(document).ready(function() {

  //Load tweet initially
  loadAndRenderTweets();

  // Listener event on form Submit
  const $form = $('#new-tweet');
    $form.submit(function(event) {
      const inputTextField = $form.find('textarea#tweet-text')
      //input empty or over 140
      if (inputTextField.val() === "" || inputTextField.val().length > 140) {
        event.preventDefault();
        alert("Tweet cannot be empty, or over 140 Chars!")
      } else {
        // No more refresh & Disable button for now for duplicate clicks
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
  const safeHTML = escape(tweetData.content.text);
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
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};