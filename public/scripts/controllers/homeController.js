'use strict'

var app = app || {};


(function(module) {
  const homeController = {};

  homeController.index = function() {

    $('#map').hide();
    $('#home').fadeIn();
  }


  module.homeController = homeController;
})(app);
