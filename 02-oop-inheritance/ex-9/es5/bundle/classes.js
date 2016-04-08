"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Actor = exports.Actor = function () {
	function Actor(name, dateOfBirth, dateOfDeath) {
		_classCallCheck(this, Actor);

		this.name = name;
		this.dateOfBirth = dateOfBirth;
		if (dateOfDeath !== undefined) {
			this.dateOfDeath = dateOfDeath;
			this.age = calcAge(this.dateOfBirth, this.dateOfDeath);;
		}
	}

	_createClass(Actor, [{
		key: "age",
		get: function get() {
			if (this._age == undefined) {
				return calcAge(this.dateOfBirth);
			} else {
				return this._age;
			}
		},
		set: function set(newAge) {
			this._age = newAge;
		}
	}]);

	return Actor;
}();

function calcAge(dob) {
	var dod = arguments.length <= 1 || arguments[1] === undefined ? Date.now() : arguments[1];

	var diff = new Date(dod - dob);
	return Math.abs(diff.getUTCFullYear() - 1970);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Logger = exports.Logger = function () {
	function Logger() {
		_classCallCheck(this, Logger);
	}

	_createClass(Logger, [{
		key: 'log',
		value: function log() {
			var eventType = arguments.length <= 0 || arguments[0] === undefined ? 'play' : arguments[0];
			var movie = arguments[1];

			var msg = 'The \'' + eventType + '\' event has been emitted';
			if (movie !== undefined) msg += 'by "' + movie.name + '" movie';
			console.log(msg);
		}
	}]);

	return Logger;
}();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Movie = exports.Movie = function (_EventEmitter) {
	_inherits(Movie, _EventEmitter);

	function Movie(name, year, duration) {
		_classCallCheck(this, Movie);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Movie).call(this));

		_this.name = name;
		_this.year = year;
		_this.duration = duration;
		_this.cast = [];
		return _this;
	}

	_createClass(Movie, [{
		key: 'play',
		value: function play() {
			console.log('Now playing "' + this.name + '"');
			this.emit('play');
		}
	}, {
		key: 'pause',
		value: function pause() {
			console.log('"' + this.name + '" is now paused');
			this.emit('pause');
		}
	}, {
		key: 'resume',
		value: function resume() {
			console.log('"' + this.name + '" has resumed playing');
			this.emit('resume');
		}
	}, {
		key: 'addCast',
		value: function addCast(actors) {
			if (Array.isArray(actors)) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = actors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var actor = _step.value;

						this.cast.push(actor);
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
			} else {
				this.cast.push(actors);
			}
		}
	}]);

	return Movie;
}(EventEmitter);
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Social = exports.Social = {
	share: function share(friendName) {
		console.log("Share " + this.name + " with " + friendName);
	},
	like: function like(friendName) {
		console.log(friendName + " likes " + this.name);
	}
};
