'use strict';

const posthtml = require('posthtml');
const attrsSorter = require('posthtml-attrs-sorter');

module.exports = (text, options, cb) => {
	posthtml()
		.use(attrsSorter(options))
		.process(text)
		.then((result) => cb(null, result.html))
		.catch((err) => cb(err));
};
