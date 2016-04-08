"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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