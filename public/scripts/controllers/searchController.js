'use strict'

var app = app || {};


(function(module) {
  const searchController = {};

  searchController.index = function() {
    $('#map').show();
    $('#home').hide();
    $('#about').hide();
    initMap()
    // $('#map').fadeIn();
  }


  module.searchController = searchController;
})(app);
