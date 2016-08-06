'use strict';

const lexer = require('pug-lexer');

module.exports = (text, options) => {
	// Added Angular after data. See https://github.com/mdo/code-guide/issues/106
	const orderList = options.order || ['class', 'id', 'name', 'data', 'ng', 'src', 'for', 'type', 'href', 'values', 'title', 'alt', 'role', 'aria'];

	return text.split('\n').map((line) => {
		if (!/\([^)]+\)/.test(line)) {
			return line;
		}

		let tokens = [];
		try {
			tokens = lexer(line.trim()).filter((token) => {
				return token.type === 'attribute';
			});
		} catch (err) {
			return line;
		}

		if (tokens.length <= 1) {
			return line;
		}

		const attrsString = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
		let separator = attrsString.replace(tokens[0].name + '=' + tokens[0].val, '');
		if (/, /.test(separator)) {
			separator = ', ';
		} else if (/,/.test(separator)) {
			separator = ',';
		} else {
			separator = ' ';
		}

		const noSortAttrs = [];
		const attrs = tokens.filter((token) => {
			for (let i = 0; i < orderList.length; i++) {
				if (new RegExp(orderList[i]).test(token.name)) {
					return true;
				}
			}

			noSortAttrs.push(token);
			return false;
		}).sort(function(a, b) {
			orderList.forEach((item) => {
				if (new RegExp(item).test(a.name)) {
					a = item;
				}
				if (new RegExp(item).test(b.name)) {
					b = item;
				}
			});

			return orderList.indexOf(a) - orderList.indexOf(b);
		}).concat(noSortAttrs).map((token) => {
			return (token.val === true) ? token.name : token.name + '=' + token.val;
		}).join(separator);

		return line.replace(/\(([^)]+)\)/, '(' + attrs + ')');
	}).join('\n');
};
