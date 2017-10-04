// -- all Javascript work to implement a cat counter and get it running

var cats = ["Kittie", "Inspiration", "Taxi", "Cutiepie", "Lovely", "Eden"];
var divCats = $('#div_catchoice');
var inner = "";

for (var i=0; i<cats.length; i++) {
    inner = inner + "<p style='border-bottom:1px solid #d0d0d0;'><input type='radio'> " + cats[i] + "</p>";
}
divCats.html(inner);


var catName_1 = "Kittie";
var catName_2 = "Inspiration";

var cat_1 = $('#img_cat1');
var cat_2 = $('#img_cat2');
var catCounter_1 = $('#id_catClicks1');
var catCounter_2 = $('#id_catClicks2');

$(document).ready(function() {
  $("#span_cat1").html(catName_1);
  $("#span_cat2").html(catName_2);
  $("#id_cat1").html(catName_1);
  $("#id_cat2").html(catName_2);

  cat_1.click(function(e) {
    var counts = Number(catCounter_1.html());
    counts = counts + 1;
    catCounter_1.html(counts);
  });
  cat_2.click(function(e) {
    var counts = Number(catCounter_2.html());
    counts = counts + 1;
    catCounter_2.html(counts);
  });
});




//
// ... and when we click, alert the value of `num`
    // elem.addEventListener('click', function() {
    //     alert(num);
    // });
//
// elem.addEventListener('click', (function(numCopy) {
//     return function() {
//         alert(numCopy);
//     };
// })(num));
