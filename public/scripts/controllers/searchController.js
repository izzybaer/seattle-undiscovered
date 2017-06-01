'use strict'

var app = app || {};


(function(module) {
  const searchController = {};

  searchController.index = function() {
    $('#map-page').show();
    // $('form').fadeIn();
    $('#home').hide();
    $('#about').hide();
    initMap()
    $('#review').hide();
    // $('#map').fadeIn();
  }


  module.searchController = searchController;
})(app);
