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