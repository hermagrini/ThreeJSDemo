var app = app || {};

(function(){
  'use strict';

  app.ContactBook = Backbone.Collection.extend({
    model: app.Contact,
    url: 'http://2-dot-crowdev-template.appspot.com/v1/tests'
  });

})();