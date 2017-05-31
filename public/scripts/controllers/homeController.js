'use strict'

var app = app || {};


(function(module) {
  const homeController = {};

  homeController.index = function() {
    $('#about').hide();
    $('#map').hide();
    $('form').hide();
    $('#home').fadeIn();
  }


  module.homeController = homeController;
})(app);
