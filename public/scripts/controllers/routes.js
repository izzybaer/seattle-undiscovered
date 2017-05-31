'use strict';

var app = app || {};


page('/', app.homeController.index);
page('/about', app.aboutController.index);
page('/search', app.searchController.index);

page();
