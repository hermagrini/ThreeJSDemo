var app = app || {};

(function(){
  'use strict';

  app.ContactBook = Backbone.Collection.extend({
    model: app.Contact,
    url: 'http://2-dot-crowdev-template.appspot.com/v1/tests',
    comparator: function (property) {
      return this.selectedStrategy.apply(app.Contact.get(property));
    },
    strategies: {
      name: function (contact) { return contact.get("name"); },
      address: function (contact) { return contact.get("address"); },
      phoneNumber: function (contact) { return contact.get("phoneNumber"); },
      email: function (contact) { return contact.get("email"); }
    },
    changeSort: function (sortProperty) {
      this.comparator = this.strategies[sortProperty];
    },
    initialize: function(){
      this.changeSort("id");
    },
    selectedStrategy: "id"
  });

})();