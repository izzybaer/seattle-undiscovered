'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  aboutController.aboutPageInit = function() {

    $(`.tab-content`).hide();
    $(`#about`).fadeIn();

  }
  module.aboutController = aboutController;
})(app);
