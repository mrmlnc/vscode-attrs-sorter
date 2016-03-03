'use strict';

var assert = require('assert');
var htmlSorter = require('../lib/html');
var jadeSorter = require('../lib/jade');

describe('HTML', function() {
	it('No attributes', function(done) {
		htmlSorter('<span>Test</span>', {}, function(err, result) {
			assert.equal(err, null);
			assert.equal(result.html, '<span>Test</span>');
			done();
		});
	});

	it('One attribute', function(done) {
		htmlSorter('<span class="class">Test</span>', {}, function(err, result) {
			assert.equal(err, null);
			assert.equal(result.html, '<span class="class">Test</span>');
			done();
		});
	});

	it('Multiple attributes', function(done) {
		htmlSorter('<span id="id" class="class">Test</span>', {}, function(err, result) {
			assert.equal(err, null);
			assert.equal(result.html, '<span class="class" id="id">Test</span>');
			done();
		});
	});

	it('Multiple attributes with options', function(done) {
		htmlSorter('<span id="id" class="class">Test</span>', {
			order: [
				'id',
				'class'
			]
		}, function(err, result) {
			assert.equal(err, null);
			assert.equal(result.html, '<span id="id" class="class">Test</span>');
			done();
		});
	});

	it('Multiple rows', function(done) {
		htmlSorter('<div id="id" class="class">\n  <span id="id" class="class">Test</span>\n  </div>', {}, function(err, result) {
			assert.equal(err, null);
			assert.equal(result.html, '<div class="class" id="id">\n  <span class="class" id="id">Test</span>\n  </div>');
			done();
		});
	});
});

describe('Pug (ex. Jade)', function() {
	it('No attributes', function() {
		var result = jadeSorter('span Test', {});
		assert.equal(result, 'span Test');
	});

	it('One attribute', function() {
		var result = jadeSorter('span(class="class") Test', {});
		assert.equal(result, 'span(class="class") Test');
	});

	it('Multiple attributes', function() {
		var result = jadeSorter('span(id="id", class="class") Test', {});
		assert.equal(result, 'span(class="class", id="id") Test');
	});

	it('Multiple attributes with options', function() {
		var result = jadeSorter('span(id="id", class="class") Test', {
			order: [
				'id',
				'class'
			]
		});
		assert.equal(result, 'span(id="id", class="class") Test');
	});

	it('Multiple rows', function() {
		var result = jadeSorter('div(id="id", class="class")\n  span.class#id Test', {});
		assert.equal(result, 'div(class="class", id="id")\n  span.class#id Test');
	});

	it('Loop', function() {
		var result = jadeSorter('nav.navbar-list\n  each href, item in _menu.navbar\n  a(href="#{href}", title="#{item}")= item', {});
		assert.equal(result, 'nav.navbar-list\n  each href, item in _menu.navbar\n  a(href="#{href}", title="#{item}")= item');
	});

	it('Splitting attributes with comma', function() {
		var result = jadeSorter('span(id="id",class="class") Test', {});
		assert.equal(result, 'span(class="class",id="id") Test');
	});

	it('Splitting attributes with space', function() {
		var result = jadeSorter('span(id="id" class="class") Test', {});
		assert.equal(result, 'span(class="class" id="id") Test');
	});
});
