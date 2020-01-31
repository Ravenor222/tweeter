$(() => {
  //Turning the UNIX unicode time into legible time
  const timeStamp = (time) => {
    const today = Date.now();
    const daysAgo = Math.floor(((today - time) / (1000 * 60 * 60)) / 24);

    if (daysAgo === 0) {
      return "Posted Today";

    } else if (daysAgo === 1) {
      return "Posted Yesterday";

    } else {
      return `Posted ${daysAgo} days ago`;
    }
  };
  //the generation of the tweet html/ classes,
  const createTweetElement = ({user: {avatars,name,handle}, content, created_at})=> {
    const $avatar = $('<img>')
      .addClass('usericon')
      .attr('src',avatars);

    const $name = $('<div>')
      .text(name)
      .addClass('name')
      .append($avatar);

    const $username = $('<div>')
      .text(handle)
      .addClass('user-name hidden');

    const $userFlexbox = $('<div>')
      .addClass("flex text-view")
      .append($name,$username);

    const $contentText = $('<p>')
      .text(content.text)
      .addClass('tweet-text');

    const $daysAgo = $('<div>')
      .text(timeStamp(created_at))
      .addClass('time-stamp');

    const $socialHeart = $('<i>')
      .addClass("fas fa-heart");

    const $socialFlag = $('<i>')
      .addClass("fas fa-flag");

    const $socialRetweet = $('<i>')
      .addClass("fas fa-retweet");

    const $socialBar = $('<div>')
      .addClass("social-wrapper")
      .append($socialHeart, $socialFlag, $socialRetweet);

    const $footerFlexbox = $('<div>')
      .addClass("flex")
      .append($daysAgo,$socialBar);

    const $header = $('<header>')
      .append($userFlexbox);

    const $footer = $('<footer>')
      .append($footerFlexbox);

    const $article = $('<article>')
      .addClass('tweet')
      .append($header,$contentText ,$footer);

    return $article;

  };
   
  //parses an array of tweets, uses create.. on server data and adds it to the tweet container in index.html
  const renderTweets = (tweets) => {
    for (const items of tweets) {
      $('.tweets-container').prepend(createTweetElement(items));
    }
  };
  //get tweets from the server, uses renderTweets to parse the array and add it to the
  const loadTweets = () => {
    $('.tweets-container').empty();
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };
    // -> Loading the tweets in the database
  loadTweets();
  // -> Tweet generation ->
  $("#submission-form").submit(function(event) {
    const serial = $(this).serialize();
    event.preventDefault();
    //Validation of the tweet form & generation of err box
    let countingNumber = $(this).find('textarea').val().length;
    if (countingNumber > 140 || countingNumber <= 0) {
      return $("#error").slideDown(300);
    } else {
      $("#error").slideUp(300, function() {
        $('textarea').focus();
      });
    }
    //post to the server with the tweet, and the number of characters of text
    $.post("/tweets",serial,()=> {
      $(".tweets-container").prepend(loadTweets());
      $("#submission-form")[0].reset();
      $('.counter').text(140);
    });
    //
  });
  //the new tweet toggle
  $("#animated-button").click(()=>{
    $(".new-tweet").slideToggle(400, function() {
      $(this).find("textarea").focus();
    });
  });
  //Makes the button appear after the header
  $(window).scroll(function() {
    if ($(document).scrollTop() > 520) {
      $("#animated-button").css({'display': 'none'});
      $(".nav-text").css({'display': 'none'});
      $("#corner-button").css({"display": "block"});
          
    } else {
      $("#animated-button").css({'display': 'block'});
      $(".nav-text").css({'display': 'block'});
      $("#corner-button").css({"display": "none"});

    }
  });
  //sends you to the top of the page and opens a new tweet.
  $('#corner-button').click(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    $(".new-tweet").slideDown(800, () => {
      $('textarea').focus();
    });
    //$("textarea").focus();
  });


});
