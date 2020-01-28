$(document).ready(function() {
    $("textarea").on("keyup" , function(){
        let example = (140 - this.value.length);
        $("form").find(".counter").text(example);        
       if(example < 0) {
        $("form").find(".counter").css("color", "red");

       } else {
        $("form").find(".counter").css("color", "#545149");}       


    })
  });