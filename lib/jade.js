'use strict';

const lexer = require('pug-lexer');

module.exports = (text, options) => {
	// Added Angular after data. See https://github.com/mdo/code-guide/issues/106
	const orderList = options.order || [
		'class', 'id', 'name',
		'data-.+', 'ng-.+', 'src',
		'for', 'type', 'href',
		'values', 'title', 'alt',
		'role', 'aria-.+',
		'$unknown$'
	];

	if (orderList.length === 0) {
		return text;
	}

	// A RegExp's for filtering and sorting
	const orderListFilterRegExp = new RegExp('^(' + orderList.join('|') + ')$');
	const orderListRegExp = orderList.map((item) => new RegExp('^' + item + '$'));

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

		let sortableAttrs = [];
		let sortedAttrs = [];
		const notSortedAttrs = [];
		let notSortedAttrsIndex = orderList.indexOf('$unknown$');
		const finalAttrs = [];

		if (notSortedAttrsIndex === -1) {
			notSortedAttrsIndex = orderList.length;
		}

		// The separation of the attributes on a sortable and not sortable basis
		sortableAttrs = tokens.filter((token) => {
			if (orderListFilterRegExp.test(token.name)) {
				return true;
			}

			notSortedAttrs.push(token);

			return false;
		});

		sortedAttrs = orderListRegExp
			// match to each position
			.map((regex) => {
				return sortableAttrs
					// attrs that belong in this regex group
					.filter((token) => regex.test(token.name))
					// alpha desc sort each group
					.sort((a, b) => typeof a.name.localeCompare === 'function' ? a.name.localeCompare(b.name) : a.name - b.name);
			})
			// remove empty groups
			.filter((group) => group.length > 0);

		// put the non-sorted attributes in desired slot
		sortedAttrs.splice(notSortedAttrsIndex, 0, notSortedAttrs);

		sortedAttrs.forEach((group) => {
			group.forEach((token) => {
				finalAttrs.push((token.val === true) ? token.name : token.name + '=' + token.val);
			});
		});

		return line.replace(/\(([^)]+).+\)/, '(' + finalAttrs.join(separator) + ')');
	}).join('\n');
};
