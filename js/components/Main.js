var React = require('react');
//var TodoApp = require('./TodoApp');
var TodoItem = require('./TodoItem');

var Main = React.createClass({
    //getInitialState: function () {},

    //componentDidMount: function () {},

    //componentWillUnmount: function () {},

    render: function () {

        var todos = [];
        var allTodos = this.props.allTodos;

        for (var key in allTodos) {
            todos.push(<TodoItem key={key} todo={allTodos[key]} />);
        }

        return (
            <main>
                <ul>
                    {todos}
                </ul>
            </main>
        );
    },

    //_onChange: function () {}
});

module.exports = Main;
