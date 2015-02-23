var React = require('react');
var TodoApp = require('./components/TodoApp.js');

React.render(
  React.createElement(TodoApp, null),
  document.querySelector('body')
);
