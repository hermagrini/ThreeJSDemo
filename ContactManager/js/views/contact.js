var app = app || {};

(function(){
  'use strict';

  app.ContactView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( $( '#contactTemplate' ).html() ),

    events: {
      'click .delete': 'deleteContact',
      'click #contact-info': 'setContactToEdit'
    },

    render: function() {
      //this.el is what we defined in tagName. use $el to get access to jQuery html() function
      this.$el.html( this.template( this.model.attributes ) );

      return this;
    },

    setContactToEdit: function(){
      var inputs = $('#addContact').children('input');
      _.each(inputs, function(el) {
        $(el).val(this.model.attributes[el.id]);
      }, this);
      $('#open-modal').click();
    },

    deleteContact: function() {
      this.model.destroy();

      //Delete view
      this.remove();
    }

  });

})();