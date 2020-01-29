
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

    const createTweetElement= (tweetObj)=> {

        // const $avatar = $(<div></div>).text(tweetObj.user.avatars);
        // const $username = $(<div></div>).text(tweetObj.user.name);
        // const $userhandle = $().text(tweetObj.user.handle);
        // const $contentText = $(<p></p>).text(tweetObj.content.text);
        // const $footer = ();
        // const $daysAgo = timeStamp(tweetObj.created_at);

        return `<article class = "tweet">
        <header>
          <div class = "name"><img class ="userIcon" src=${tweetObj.user.avatars}>  ${tweetObj.user.name}</div>
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

          <div class = "daysAgo">${timeStamp(tweetObj.created_at)}</div>
        </footer>

      </article>`
    }
    //
    
    //
    const timeStamp = (time) => {
    
         const today = new Date();
         const day = new Date(time);
         const daysAgo = today.getDate() - day.getDate();
        
         if(daysAgo === 0) {
             return "Posted Today";
         } else {
             return `Posted ${today.getDate() - day.getDate()} days ago`
         }
    }

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

