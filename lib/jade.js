'use strict';

const lexer = require('pug-lexer');

module.exports = (text, options) => {
	// Added Angular after data. See https://github.com/mdo/code-guide/issues/106
	const orderList = options.order || ['class', 'id', 'name', 'data', 'ng', 'src', 'for', 'type', 'href', 'values', 'title', 'alt', 'role', 'aria'];

	// A RegExp's for filtering and sorting
	const orderListFilterRegExp = new RegExp('(' + orderList.join('|') + ')');
	const orderListRegExp = orderList.map(function(item) {
		return new RegExp('^' + item);
	});

	return text.split(/\r?\n/).map((line) => {
		if (!/\([^)]+\)/.test(line)) {
			return line;
		}

		let tokens = [];
		try {
			tokens = lexer(line.trim()).filter((token) => token.type === 'attribute');
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

		const notSortedAttrs = [];
		const attrs = tokens
			.filter((token) => {
				if (orderListFilterRegExp.test(token.name)) {
					return true;
				}

				notSortedAttrs.push(token);
				return false;
			})
			.sort(function(a, b) {
				orderListRegExp.forEach(function(re, index) {
					if (re.test(a.name)) {
						a = index;
					}
					if (re.test(b.name)) {
						b = index;
					}
				});

				return a - b;
			})
			.concat(notSortedAttrs).map((token) => {
				return (token.val === true) ? token.name : token.name + '=' + token.val;
			})
			.join(separator);

		return line.replace(/\(([^)]+).+\)/, '(' + attrs + ')');
	}).join('\n');
};
