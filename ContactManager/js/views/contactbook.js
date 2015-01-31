var app = app || {};

(function(){
  'use strict';

  app.ContactBookView = Backbone.View.extend({
    el: '#contact-list',

    initialize: function() {
      this.collection = new app.ContactBook();
      this.collection.fetch({reset: true});
      this.render();
      this.listenTo( this.collection, 'add', this.renderContact);
      this.listenTo( this.collection, 'reset', this.render);
      this.listenTo( this.collection, 'change', this.render);
      this.listenTo( this.collection, 'sort', this.render);
    },

    events:{
      'click #add':'addContact',
      'click .sortContact': 'sortContact'
    },

    render: function() {
      $('#generated-contact-list').html("");
      this.collection.each(function(item) {
        this.renderContact(item);
      }, this);
    },

    addContact: function(e) {
      e.preventDefault();

      var formData = {};

        var inputs = $('#addContact')[0];
        _.each(inputs,function(el) {
        if( $(el).val() !== '' ) {
          formData[ el.id ] = $(el).val();
        }
      }, this);

      if(formData.id && formData.id != ''){
        var contact = this.collection.get(formData.id);
        contact.set(formData);
        contact.save();
        this.collection.set(contact,{remove:false});
      }else{
        this.collection.create(formData);
      }
      $('input').val('');
      $('#close-modal').click();
    },

    renderContact: function(item) {
      var contactView = new app.ContactView({
        model: item
      });
      $('#generated-contact-list').append(contactView.render().el);
    },

    sortContact: function(e){
      e.preventDefault();
      this.collection.changeSort(e.currentTarget.getAttribute("data-sort-by"));
      this.collection.sort();
    }
  });

})();