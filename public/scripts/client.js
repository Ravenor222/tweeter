
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

    const createTweetElement= (tweetObj)=> {
         const $avatar = $('<img>')
         .addClass('userIcon')
         .attr('src',tweetObj.user.avatars);

         const $name = $('<div>')
         .text(tweetObj.user.name)
         .addClass('name')
         .append($avatar);

         const $username = $('<div>')
         .text(tweetObj.user.handle)
         .addClass('username hidden');

         const $contentText = $('<p>')
         .text(tweetObj.content.text)
         .addClass('tweetText');

         const $daysAgo = $('<div>')
         .text(timeStamp(tweetObj.created_at))
         .addClass('daysAgo');

         const socialBar = 
         `<div class = "socialWrapper">
            <a href="https://www.twitter.com">
             <img src="/images/twitter.svg"></img>
             </a>
          </div>

        <div class = "socialWrapper">
            <a href="https://www.facebook.com">
                <img src="/images/facebook.svg"></img>
            </a>
        </div>

        <div class = "socialWrapper">
          <a href="https://www.instagram.com">
               <img src="/images/insta.svg"></img>
          </a>
        </div>`

         const $header = $('<header>')
         .append($name, $username);

         const $footer = $('<footer>')
         .append(socialBar, $daysAgo);

         const $article = $('<article>')
         .addClass('tweet')
         .append($header,$contentText ,$footer);

        return $article;
    //     
    }
    //
    
    //
    const timeStamp = (time) => {
         const today = Date.now();
         const daysAgo = Math.floor(((today - time) / (1000 * 60 * 60)) / 24);

         if(daysAgo === 0) {
            return "Posted Today";

         } else if (daysAgo === 1) {
            return "Posted Yesterday";

         } else {
            return `Posted ${daysAgo} days ago`
         }
    }

    const renderTweets = (tweets) => {
        for(const items of tweets) {
            $('.tweets-container').prepend(createTweetElement(items));
        }
    }
    const loadTweets = () => {
        $('.tweets-container').empty();
        $.get("/tweets", (data) => {
            renderTweets(data);
        })
    };
    // -> Loading the tweets in the databae
    loadTweets()
    //
    
    $("#submissionForm").submit(function(event){
        const serial = $(this).serialize();
        event.preventDefault();
        let countingNumber = $("textarea").val().length;
           if(countingNumber > 140 || countingNumber <= 0) {
              return alert("Tweets must be between 1-140 characters!");

           }
        $.post("/tweets",serial,()=> {
            $(".tweets-container").prepend(loadTweets())
            $("#submissionForm")[0].reset();
        })
    //
    });




        // const $button = $('#subButton');
        // $button.on('click', function () {
        //     event.preventDefault();
        //   console.log('Button clicked, performing ajax call...');

        //   $.ajax('more-posts.html', { method: 'GET' })
        //   .then(function (morePostsHtml) {
        //     console.log('Success: ', morePostsHtml);
        //     $button.replaceWith(morePostsHtml);
        //   });
        // });


})

