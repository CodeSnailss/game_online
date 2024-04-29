$(document).ready(function () {
   var heart = $('.favoriteClick');
   var flag = new Array(heart.length);
   for (var i = 0; i < heart.length; i++) {
      flag[i] = true;
      heart[i].click(function (event) {
         if (flag){
            flag[i] = false;
            heart[i].addClass("red");
         }else {
            flag[i] = true;
            heart[i].removeClass("read");
         }
      })
   }
   $('.favoriteClick').click()
});
