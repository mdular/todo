/**
 * Dispatcher
 *
 * @method register(callback) Register a callback to be invoked by an action
 * @method dispatch(payload) Dispatch callbacks and resolve/reject promises
 */

var Promise = require('es6-promises');
var assign = require('object-assign');

var _callbacks  = [],
    _promises   = [];

var Dispatcher = function () {};
Dispatcher.prototype = assign({}, Dispatcher.prototype, {

  /**
   * Register callback to be invoked by an action
   * @param {function} callback
   * @return {number} index
   */
  register: function (callback) {
    _callbacks.push(callback);
    return _callbacks.length -1;
  },

  /**
   * Dispatch callbacks and resolve/reject promises
   * @param {object} payload
   */
  dispatch: function (payload) {

    // hold Promise results
    var resolves = [],
        rejects = [];

    // create Promises for registered callbacks
    _promises = _callbacks.map(function(currentValue, i) {
      return new Promise(function(resolve, reject) {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });

    // dispatch callbacks
    _callbacks.forEach(function (callback, i) {

      // resolve or reject promises
      Promise.resolve(callback(payload)).then(function () {
        resolves[i](payload);
      }, function () {
        rejects[i](new Error('Dispatcher callback failed'));
      });
    });

    // clear promises
    _promises = [];
  }
});

module.exports = Dispatcher;
