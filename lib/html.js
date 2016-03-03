'use strict';

var posthtml = require('posthtml');
var attrsSorter = require('posthtml-attrs-sorter');

module.exports = function(text, options, cb) {
	posthtml()
		.use(attrsSorter(options))
		.process(text)
		.then(function(result) {
			cb(null, result.html);
		})
		.catch(function(err) {
			cb(err);
		});
};
