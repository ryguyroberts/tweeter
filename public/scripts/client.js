/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Load Document appent tweet.
$(document).ready(function() {
  loadtweets(function(data) {
    renderTweets(data);
  })
});

//helper functions

// HTML outline return
const createTweetElement = function(tweetData) {
  return `
  <article class ="tweet">
          <header>
            <div>
            <img src=${tweetData.user.avatars}$>
            <p>${tweetData.user.name}</p>
            </div>
            <p class ="handle">${tweetData.user.handle}</p>
          </header>
          <p class ="tweet-bod">${tweetData.content.text}</p>
          <footer>
            <p>${tweetData.created_at}</p>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
  `
};

// RenderTweets
const renderTweets = function(arrTweetObj) {
  for (const tweet of arrTweetObj) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

const loadtweets = function(callback) {
  $.get("/tweets", function(data, status) {
    callback(data);
  })
};