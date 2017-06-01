'use strict'

var app = app || {};


(function(module) {
  const searchController = {};

  searchController.index = function() {
    $('#map-page').show();
    $('#home').hide();
    $('#about').hide();
    initMap()
    $('#review').hide();
  }


  module.searchController = searchController;
})(app);
