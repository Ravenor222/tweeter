
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
    //the generation of the tweet html/ classes
    const createTweetElement= ({user: {avatars,name,handle}, content, created_at})=> {
         const $avatar = $('<img>')
         .addClass('userIcon')
         .attr('src',avatars);

         const $name = $('<div>')
         .text(name)
         .addClass('name')
         .append($avatar);

         const $username = $('<div>')
         .text(handle)
         .addClass('username hidden');

         const $contentText = $('<p>')
         .text(content.text)
         .addClass('tweetText');

         const $daysAgo = $('<div>')
         .text(timeStamp(created_at))
         .addClass('daysAgo');

         const $socialHeart = $('<i>')
         .addClass("fas fa-heart")

         const $socialFlag = $('<i>')
         .addClass("fas fa-flag")

         const $socialRetweet = $('<i>')
         .addClass("fas fa-retweet")

         const $socialBar = $('<div>')
         .addClass("socialWrapper")
         .append($socialHeart, $socialFlag, $socialRetweet);
         
         const $header = $('<header>')
         .append($name, $username);

         const $footer = $('<footer>')
         .append($socialBar, $daysAgo);

         const $article = $('<article>')
         .addClass('tweet')
         .append($header,$contentText ,$footer);

        return $article;

    }
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
    //
    const renderTweets = (tweets) => {
        for(const items of tweets) {
            $('.tweets-container').prepend(createTweetElement(items));
        }
    }
    //
    const loadTweets = () => {
        $('.tweets-container').empty();
        $.get("/tweets", (data) => {
            renderTweets(data);
        })
    };
    // -> Loading the tweets in the database
    loadTweets()
    // -> Tweet generation -> 
    $("#submissionForm").submit(function(event){
        const serial = $(this).serialize();
        event.preventDefault();
        //Validation of the tweet form
        let countingNumber = $(this).find('textarea').val().length;
           if(countingNumber > 140 || countingNumber <= 0) {
                return $("#error").slideDown(300);
           } else {
               $("#error").slideUp(300, function() {
                   $('textarea').focus();
               });
           }
        //post to the server with the tweet, and the number of characters of text
        $.post("/tweets",serial,()=> {
            $(".tweets-container").prepend(loadTweets())
            $("#submissionForm")[0].reset();
            $('.counter').text(140);
        })
    //
    });
    //the new tweet toggle
    $("#animatedButton").click(()=>{
        $(".new-tweet").slideToggle(400, function() {
            $(this).find("textarea").focus();
        });
    })
    //Makes the button appear after the header
    $(window).scroll(function(){
        if($(document).scrollTop() > 520){
          $(".navText").css({'display': 'none'});
          $("#cornerButton").css({"display": "block"})
          
        } else {
          $(".navText").css({'display': 'block'});
          $("#cornerButton").css({"display": "none"})

        }
    });
    //sends you to the top of the page and opens a new tweet.
    $('#cornerButton').click(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
       $(".new-tweet").slideDown(800, () => {
           $('textarea').focus()
       });
       //$("textarea").focus();
    })


})

