// -- all Javascript work to implement a cat counter and get it running

$(function(){

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Model
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var model = {
      currentCat: null,
      cats:[ {
               id: 1,
               name: "Kittie",
               pic: "cat_kittie.jpg",
               counter: 0
             },
             {
               id: 2,
               name: "Inspiration",
               pic: "cat_inspiration.jpg",
               counter: 0
             },
             {
               id: 3,
               name: "Taxi",
               pic: "cat_taxi.jpg",
               counter: 0
             },
             {
               id: 4,
               name: "Cutiepie",
               pic: "cat_cutiepie.jpg",
               counter: 0
             },
             {
               id: 5,
               name: "Lovely",
               pic: "cat_lovely.jpg",
               counter: 0
             },
             {
               id: 6,
               name: "Eden",
               pic: "cat_eden.jpg",
               counter: 0
             }
      ]
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Octopus - Verbindung zw. Model und View
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var octopus = {

      getCat: function(id) {
        this.getCats().forEach(function(cat) {
          if (cat.id == id) {
            viewCat.render(cat);
          }
        });
      },

      getCurrentCat: function() {
        return model.currentCat;
      },

      getCats: function() {
        return model.cats;
      },

      setCurrentCat: function(cat) {
        model.currentCat = cat;
      },

      incrementCounter: function() {
        model.currentCat.counter++;
        viewCat.render();
      },

      updateCatName: function() {
        model.currentCat.name = $('#catname').val();
      },

      updateCatUrl: function() {
        model.currentCat.pic = $('#caturl').val();
      },

      updateCatClicks: function() {
        model.currentCat.counter = $('#catclicks').val();
      },

      init: function() {
        model.currentCat = model.cats[0];
        viewList.init();
        viewCat.init();
        adminArea.init();
      }

    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // View 1 - Liste der Katzen
    // - weil die Liste nur 1x gezeichnet werden muss, ist es in der init-Funktion
    //   statt in einer extra render()-funktion
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var viewList = {
      init: function() {
        // hier werden die Katzen angezeigt
        var catList = document.getElementById('div_catchoice');
        var htmlStr = "";
        var elem, cat, i;
        var cats = octopus.getCats();

        catList.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    viewCat.render();
                };
            })(cat));

            // finally, add the element to the list
            catList.appendChild(elem);
        }

      }
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // View 2 - CatClicker Area
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var viewCat = {
      init: function() {
        $('#id_catname').html('');
        $('#id_catcounter').html('no cat chosen');
        $('#img_cat').html('');
        $('#img_cat').on('click', function() {
          octopus.incrementCounter();
        });
        octopus.setCurrentCat(model.cats[0]);
        this.render();
      },

      render: function() {
        var currentCat = octopus.getCurrentCat();

        $('#id_catname').html(currentCat.name);
        $('#id_catcounter').html(currentCat.counter);
        $('#img_cat').attr('src', 'images/'+currentCat.pic);

        adminArea.render();
      }
    };


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // View 3 - Admin Area
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var adminArea = {
      init: function() {
        var adminBtn = $('#adminbtn');
        var cancelBtn = $('#btnCancel');
        var saveBtn = $('#btnSave');

        $('#fAdmin').css('display', 'none');

        adminBtn.on('click', function() {
          $('#fAdmin').toggle();
          adminArea.render();
        });

        // Cancel-Button initialisieren
        cancelBtn.on('click', function() {
          $('#fAdmin').css('display', 'none');
        });

        // Save-Button initialisieren
        saveBtn.on('click', function(e) {
          octopus.updateCatName($('#catname').val());
          octopus.updateCatUrl($('#caturl').val());
          octopus.updateCatClicks($('#catclicks').val());
          e.preventDefault();
          viewCat.render();
          viewList.init();
          $('#fAdmin').css('display', 'none');
        });
      },

      render: function() {
        var catName, catUrl, catClicks;
        var currentCat = octopus.getCurrentCat();
        catName = $('#catname');
        catUrl = $('#caturl');
        catClicks = $('#catclicks');
        catName.val(currentCat.name);
        catUrl.val(currentCat.pic);
        catClicks.val(currentCat.counter);
      }
    };


    // run the awesome thing
    octopus.init();

});
