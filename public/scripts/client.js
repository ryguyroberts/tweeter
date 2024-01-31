/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Des",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

//Load Document appent tweet.
$(document).ready(function() {
  renderTweets(data);
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
    console.log(tweet);
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};