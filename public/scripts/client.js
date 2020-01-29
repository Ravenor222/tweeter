/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetObj = [
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
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
]


$(() => {

    const createTweetElement= (tweetObj)=> {
        return `<article class = "tweet">
        <header>
          <div class = "name"><img class ="usericon" src=${tweetObj.user.avatars}>${tweetObj.user.name}</div>
          <div id = "hide" class = "username hidden">${tweetObj.user.handle}</div>
        </header>

        <p class="tweetText" >${tweetObj.content.text}</p>

        <footer>
          <div class = "daysAgo">${tweetObj.created_at}</div>
        </footer>

      </article>`
    }
    const renderTweets = (tweets) => {
        for(const items of tweets) {
            $('.tweets-container').prepend(createTweetElement(items));
        }
    }

   renderTweets(tweetObj)

})

