'use strict';

var app = app || {};

(function(module) {
  const aboutController = {};

  aboutController.index = function() {

    $('#map-page').hide();
    $('#home').hide();
    $('#about').fadeIn();

  }
  module.aboutController = aboutController;
})(app);
