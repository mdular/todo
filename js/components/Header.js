var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput');

var R = React.createElement;

var Header = React.createClass({
    //getInitialState: function () {},

    //componentDidMount: function () {},

    //componentWillUnmount: function () {},

    render: function () {
        return (
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput
                    id="new-todo"
                    placeholder="What needs to be done?"
                    onSave={this._onSave}
                />
                <p>
            </header>
        );
    },

    _onSave: function (text) {
        TodoActions.create(text);
    }
});

module.exports = Header;
