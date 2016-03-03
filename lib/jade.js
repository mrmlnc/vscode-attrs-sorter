'use strict';

module.exports = function(text, options) {
	// Added Angular after data. See https://github.com/mdo/code-guide/issues/106
	var orderList = options.order || ['class', 'id', 'name', 'data', 'ng', 'src', 'for', 'type', 'href', 'values', 'title', 'alt', 'role', 'aria'];

	return text.split('\n').map(function(line) {
		if (!/\([^)]+\)/.test(line)) {
			return line;
		}

		var attrsString = /\(([^)]+)\)/.exec(line)[1];
		var attrs = attrsString.split(/[ ,]+/);

		if (attrs.length === 1) {
			return line;
		}

		var separator = attrsString.replace(attrs[0], '');
		if (/, /.test(separator)) {
			separator = ', ';
		} else if (/,/.test(separator)) {
			separator = ',';
		} else {
			separator = ' ';
		}

		var noSortAttrs = [];
		attrs = attrs.filter(function(attr) {
			// The name attribute can be shared (i.e. data-*, aria-*, ng-*),
			// so used a regular expression
			for (var i = 0; i < orderList.length; i++) {
				if (new RegExp(orderList[i] + '=(\'|")').test(attr)) {
					return true;
				}
			}

			noSortAttrs.push(attr);
			return false;
		}).sort(function(a, b) {
			orderList.forEach(function(item) {
				if (new RegExp(item + '=(\'|")').test(a)) {
					a = item;
				}
				if (new RegExp(item + '=(\'|")').test(b)) {
					b = item;
				}
			});

			return orderList.indexOf(a) - orderList.indexOf(b);
		}).concat(noSortAttrs).join(separator);

		return line.replace(/\(([^)]+)\)/, '(' + attrs + ')');
	}).join('\n');
};
