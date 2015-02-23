var Header = require('./Header');
var Footer = require('./Footer');
var Main = require('./Main');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

function getTodoState () {
	return {
		allTodos: TodoStore.getAll()
	};
}

var TodoApp = React.createClass({
	getInitialState: function () {
		return getTodoState();
	},

	componentDidMount: function () {
		TodoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		TodoStore.removeChangeListener(this._onChange);
	},

	render: function () {
		return (
			<div id="app">
				<Header />
				<Main
					allTodos={this.state.allTodos}
					areAllComplete={this.state.areAllComplete}
				/>
				<Footer allTodos={this.state.allTodos} />
			</div>
		);
	},

	_onChange: function () {
		this.setState(getTodoState());
	}
});

module.exports = TodoApp;
