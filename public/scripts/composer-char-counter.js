$(document).ready(function() {
  $("textarea").on("keyup" , function() {
    let charCounter = (140 - this.value.length);
    $("form").find(".counter").text(charCounter);

    if (charCounter < 0) {
      $("form").find(".counter").css("color", "red");
    } else {
      $("form").find(".counter").css("color", "#545149");
    }


  });
});