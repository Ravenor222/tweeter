
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

    const createTweetElement= (tweetObj)=> {
        return `<article class = "tweet">
        <header>
          <div class = "name"><img class ="usericon" src=${tweetObj.user.avatars}>${tweetObj.user.name}</div>
          <div id = "hide" class = "username hidden">${tweetObj.user.handle}</div>
        </header>

        <p class="tweetText" >${tweetObj.content.text}</p>

        <footer>
            <div class = "socialWrapper">
                <a href="https://www.twitter.com">
                    <img src="/images/twitter.svg"></img>
                </a>
            </div>

            <div class = "socialWrapper">
                <a href="https://www.facebook.com">
                    <img src="/images/facebook.svg"></img></a></div>

            <div class = "socialWrapper">
                <a href="https://www.instagram.com">
                    <img src="/images/insta.svg"></img>
                </a>
            </div>

          <div class = "daysAgo">${tweetObj.created_at}</div>
        </footer>

      </article>`
    }
    //
    
    //
  
    const renderTweets = (tweets) => {
            for(const items of tweets) {
                $('.tweets-container').prepend(createTweetElement(items));
            }
    }
    const loadTweets = () => {
        $.get("/tweets", (data) => {
            renderTweets(data);
        })
    };
    //
    loadTweets();
    //
    
    $("#submissionForm").submit(function(event){
        const serial = $(this).serialize();
        event.preventDefault();
        let countingNumber = $("textarea").val().length;;
           if(countingNumber > 140 || countingNumber <= 0) {
              return alert("Tweets must be between 1-140 characters!");

           }
        $.post("/tweets",serial,()=> {
            console.log("nosuccess");
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

