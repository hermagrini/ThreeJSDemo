var app = app || {};

(function(){
  'use strict';

  app.Contact = Backbone.Model.extend({
    defaults: {
      contactPhoto: 'img/default.png',
      name: 'John Doe',
      address: 'Sample Address, 55245, CA',
      phoneNumber: '1 234 5678 9100',
      email: 'jonh.doe@unknown.com'
    },
    urlRoot: 'http://2-dot-crowdev-template.appspot.com/v1/tests/',

    initialize: function () {
      var that = this;

      $.ajaxPrefilter( function(options) {
        options.crossDomain ={
          crossDomain: true
        };
      });
    }
  });

})();