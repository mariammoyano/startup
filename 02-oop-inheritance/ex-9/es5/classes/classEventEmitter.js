"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = exports.EventEmitter = function () {
	function EventEmitter() {
		_classCallCheck(this, EventEmitter);

		this.listeners = new Map();
	}

	_createClass(EventEmitter, [{
		key: "on",
		value: function on(event, callback) {
			if (!this.listeners.has(event)) {
				this.listeners.set(event, []);
			}
			this.listeners.get(event).push(callback);
			console.log("\"" + event + "\" listener added");
		}
	}, {
		key: "emit",
		value: function emit(event) {
			if (this.listeners.has(event)) {
				console.log("Calling '" + event + "' listenters");
				try {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = this.listeners.get(event)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var value = _step.value;

							value();
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				} catch (ex) {
					console.log("EXCEPTION thrown by 'emit()'. (" + ex + ").");
				}
			}
		}
	}, {
		key: "off",
		value: function off(event) {
			this.listeners.delete(event);
			console.log("'" + event + "' listener(s) removed");
		}
	}]);

	return EventEmitter;
}();