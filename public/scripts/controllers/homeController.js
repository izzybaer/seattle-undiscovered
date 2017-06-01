'use strict'

var app = app || {};


(function(module) {
  const homeController = {};

  homeController.index = function() {
    $('#about').hide();
    $('#map-page').hide();
    $('#home').fadeIn();
  }


  module.homeController = homeController;
})(app);
