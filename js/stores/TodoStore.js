var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    TodoConstants = require('../constants/TodoConstants'),
    assign = require('object-assign');

var EVENT_CHANGE = 'change';

// todo items collection
var _todos = {};


/**
 * Add an item
 */
function create (text) {
  // using timestamp + random number as id
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

  _todos[id] = {
    id        : id,
    complete  : false,
    text       : text
  };
}

/**
 * Update an item
 */
function update (id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all items
 */
function updateAll (updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete an item
 */
function destroy (id) {
  delete _todos[id];
}

/**
 * Delete all completed items
 */
function destroyCompleted () {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Test if items remain incomplete
   */
  areAllComplete: function () {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }

    return true;
  },

  /**
   * Get all items
   */
  getAll: function () {
    return _todos;
  },

	/**
	 * Trigger change
	 */
  emitChange: function () {
    this.emit(EVENT_CHANGE);
  },

  addChangeListener: function (callback) {
    this.on(EVENT_CHANGE, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(EVENT_CHANGE, callback);
  },

	/**
 	 * Register with the dispatcher and handle the actions
 	 */
  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action,
        text;

    switch(action.actionType) {

      // create action
      case TodoConstants.TODO_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          TodoStore.emitChange();
        }
        break;

			// TODO: complete all

			// TODO: uncomplete

			// TODO: complete

			// TODO: update text



      // destroy action
      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emitChange();
        break;

      // TODO: destroy completed

			default:
				// nothing.
    }

    // No errors, fulfill promise
    return true;
  })

});

module.exports = TodoStore;
