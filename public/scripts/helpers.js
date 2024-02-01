// Helper Functions

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
  `;
};

// Error HTML outline
const createErrorElement = function(str) {
  if (str === "empty") {
    return `
    <p><i class="fa-solid fa-triangle-exclamation"></i> Tweet cannot be empty! <i class="fa-solid fa-triangle-exclamation"></i></i></p>
  `;
  }
  if (str === "overChar") {
    return `
    <p><i class="fa-solid fa-triangle-exclamation"></i>Tweet cannot be over 140 Chars!<i class="fa-solid fa-triangle-exclamation"></i></p>
  `;
  }
};

// Slide error logic
const slideError = function(errorMsg) {
  const $errorContainer = $('.error-container');
  
  if (!$errorContainer.is(':visible')) {
    // if not visible set content and then slidedown
    $errorContainer.html(errorMsg).slideDown();

  } else {
    // if visible just want to update the error msg
    $errorContainer.html(errorMsg);
  }
};

// Load and render tweets
const loadAndRenderTweets = function() {
  loadtweets(function(data) {
    renderTweets(data);
  });
};

// RenderTweets
const renderTweets = function(arrTweetObj) {
  //Clear before rendering
  $('#tweets-container').empty();

  for (const tweet of arrTweetObj) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

const loadtweets = function(callback) {
  $.get("/tweets", function(data) {
    callback(data);
  });
};

// escape function for xss
const santitizeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};