'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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