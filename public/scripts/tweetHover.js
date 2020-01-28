$(() => {
    $(".tweet-container").hover(function() {
        $(this).css("box-shadow", "10px 10px 10px lightgrey");
    },function(){
        $(this).css("box-shadow", "0px 0px");
    })
});