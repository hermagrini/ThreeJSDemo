var app = app || {};

$(function() {
  var books = [
    { name: 'JavaScript: The Good Parts', lastName: 'Douglas Crockford', phoneNumber: '54 261 667443', email: 'JavaScript Programming' },
    { name: 'The Little Book on CoffeeScript', lastName: 'Alex MacCaw', phoneNumber: '54 261 667443', email: 'CoffeeScript Programming' },
    { name: 'Scala for the Impatient', lastName: 'Cay S. Horstmann', phoneNumber: '54 261 667443', email: 'Scala Programming' },
    { name: 'American Psycho', lastName: 'Bret Easton Ellis', phoneNumber: '54 261 667443', email: 'Novel Splatter' },
    { name: 'Eloquent JavaScript', lastName: 'Marijn Haverbeke', phoneNumber: '54 261 667443', email: 'JavaScript Programming' }
  ];

  new app.ContactBookView();
});