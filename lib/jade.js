'use strict';

var lexer = require('pug-lexer');

module.exports = function(text, options) {
	// Added Angular after data. See https://github.com/mdo/code-guide/issues/106
	var orderList = options.order || ['class', 'id', 'name', 'data', 'ng', 'src', 'for', 'type', 'href', 'values', 'title', 'alt', 'role', 'aria'];

	return text.split('\n').map(function(line) {
		if (!/\([^)]+\)/.test(line)) {
			return line;
		}

		var tokens = lexer(line.trim()).filter(function(token) {
			return token.type === 'attribute';
		});

		if (tokens.length === 1) {
			return line;
		}

		var attrsString = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
		var separator = attrsString.replace(tokens[0].name + '=' + tokens[0].val, '');
		if (/, /.test(separator)) {
			separator = ', ';
		} else if (/,/.test(separator)) {
			separator = ',';
		} else {
			separator = ' ';
		}

		var noSortAttrs = [];
		var attrs = tokens.filter(function(token) {
			for (var i = 0; i < orderList.length; i++) {
				if (new RegExp(orderList[i]).test(token.name)) {
					return true;
				}
			}

			noSortAttrs.push(token);
			return false;
		}).sort(function(a, b) {
			orderList.forEach(function(item) {
				if (new RegExp(item).test(a.name)) {
					a = item;
				}
				if (new RegExp(item).test(b.name)) {
					b = item;
				}
			});

			return orderList.indexOf(a) - orderList.indexOf(b);
		}).concat(noSortAttrs).map(function(token) {
			return (token.val === true) ? token.name : token.name + '=' + token.val;
		}).join(separator);

		return line.replace(/\(([^)]+)\)/, '(' + attrs + ')');
	}).join('\n');
};
