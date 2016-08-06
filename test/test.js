'use strict';

const assert = require('assert');
const htmlSorter = require('../lib/html');
const jadeSorter = require('../lib/jade');

describe('HTML', () => {
	it('No attributes', (done) => {
		htmlSorter('<span>Test</span>', {}, (err, html) => {
			assert.equal(err, null);
			assert.equal(html, '<span>Test</span>');
			done();
		});
	});

	it('One attribute', (done) => {
		htmlSorter('<span class="class">Test</span>', {}, (err, html) => {
			assert.equal(err, null);
			assert.equal(html, '<span class="class">Test</span>');
			done();
		});
	});

	it('Multiple attributes', (done) => {
		htmlSorter('<span id="id" class="class">Test</span>', {}, (err, html) => {
			assert.equal(err, null);
			assert.equal(html, '<span class="class" id="id">Test</span>');
			done();
		});
	});

	it('Multiple attributes with options', (done) => {
		htmlSorter('<span id="id" class="class">Test</span>', {
			order: [
				'id',
				'class'
			]
		}, (err, html) => {
			assert.equal(err, null);
			assert.equal(html, '<span id="id" class="class">Test</span>');
			done();
		});
	});

	it('Multiple rows', function(done) {
		htmlSorter('<div id="id" class="class">\n  <span id="id" class="class">Test</span>\n  </div>', {}, function(err, html) {
			assert.equal(err, null);
			assert.equal(html, '<div class="class" id="id">\n  <span class="class" id="id">Test</span>\n  </div>');
			done();
		});
	});
});

describe('Pug (ex. Jade)', () => {
	it('No attributes', () => {
		const result = jadeSorter('span Test', {});
		assert.equal(result, 'span Test');
	});

	it('One attribute', () => {
		const result = jadeSorter('span(class="class") Test', {});
		assert.equal(result, 'span(class="class") Test');
	});

	it('Boolean attribute', () => {
		const result = jadeSorter('input(class="class", required)', {});
		assert.equal(result, 'input(class="class", required)');
	});

	it('One attribute with the value of multiple words', () => {
		const result = jadeSorter('a.class(href="#", title="one two three") Test', {});
		assert.equal(result, 'a.class(href="#", title="one two three") Test');
	});

	it('Multiple attributes', () => {
		const result = jadeSorter('span(id="id", class="class") Test', {});
		assert.equal(result, 'span(class="class", id="id") Test');
	});

	it('Multiple attributes with options', () => {
		const result = jadeSorter('span(id="id", class="class") Test', {
			order: [
				'id',
				'class'
			]
		});
		assert.equal(result, 'span(id="id", class="class") Test');
	});

	it('Multiple rows', () => {
		const result = jadeSorter('div(id="id", class="class")\n  span.class#id Test', {});
		assert.equal(result, 'div(class="class", id="id")\n  span.class#id Test');
	});

	it('Loop', () => {
		const result = jadeSorter('nav.navbar-list\n  each href, item in _menu.navbar\n  a(href="#{href}", title="#{item}")= item', {});
		assert.equal(result, 'nav.navbar-list\n  each href, item in _menu.navbar\n  a(href="#{href}", title="#{item}")= item');
	});

	it('Loop with sortable attrs', () => {
		const result = jadeSorter('nav.navbar-list\n  each href, item in _menu.navbar\n  span(id="id", class="class")= item', {});
		assert.equal(result, 'nav.navbar-list\n  each href, item in _menu.navbar\n  span(class="class", id="id")= item');
	});

	it('Splitting attributes with comma', () => {
		const result = jadeSorter('span(id="id",class="class") Test', {});
		assert.equal(result, 'span(class="class",id="id") Test');
	});

	it('Splitting attributes with space', () => {
		const result = jadeSorter('span(id="id" class="class") Test', {});
		assert.equal(result, 'span(class="class" id="id") Test');
	});

	it('Attribute value in single quotes', () => {
		const result = jadeSorter(`span(id='id' class='class') Test`, {});
		assert.equal(result, `span(class='class' id='id') Test`);
	});

	it('nested quotation marks', () => {
		const result = jadeSorter(`.owl-item(style="background-image: url('../images/slider/header-bg-0.png')")`, {});
		assert.equal(result, `.owl-item(style="background-image: url('../images/slider/header-bg-0.png')")`);
	});

	it('Expressions in attributes', () => {
		const result = jadeSorter(`body(id='id', class="page-" + page.name)`, {});
		assert.equal(result, `body(class="page-" + page.name, id='id')`);
	});
});
