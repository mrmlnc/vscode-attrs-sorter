'use strict';

const assert = require('assert');
const htmlSorter = require('../lib/html');

describe('HTML', () => {
	it('No attributes', () => {
		return htmlSorter('<span>Test</span>', {}).then((result) => {
			assert.equal(result.html, '<span>Test</span>');
		});
	});

	it('One attribute', () => {
		return htmlSorter('<span class="class">Test</span>', {}).then((result) => {
			assert.equal(result.html, '<span class="class">Test</span>');
		});
	});

	it('Multiple attributes', () => {
		return htmlSorter('<span id="id" class="class">Test</span>', {}).then((result) => {
			assert.equal(result.html, '<span class="class" id="id">Test</span>');
		});
	});

	it('Multiple attributes with options', () => {
		return htmlSorter('<span id="id" class="class">Test</span>', {
			order: [
				'id',
				'class'
			]
		}).then((result) => {
			assert.equal(result.html, '<span id="id" class="class">Test</span>');
		});
	});

	it('Multiple rows', function() {
		return htmlSorter('<div id="id" class="class">\n  <span id="id" class="class">Test</span>\n  </div>', {}).then((result) => {
			assert.equal(result.html, '<div class="class" id="id">\n  <span class="class" id="id">Test</span>\n  </div>');
		});
	});
});
