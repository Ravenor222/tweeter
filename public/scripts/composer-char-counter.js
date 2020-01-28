$(document).ready(function() {
    $("textarea").on("keyup" , function(){
        console.log(140 - this.value.length);
        console.log(this);
       //this is the sentence => console.log(this.value,"2");
        
    })
  });