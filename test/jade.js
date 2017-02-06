'use strict';

const assert = require('assert');
const jadeSorter = require('../lib/jade');

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

	it('Event function in attributes', () => {
		const result = jadeSorter(`input(name="files", type="file", onchange='uploadFile()')`, {});
		assert.equal(result, `input(name="files", type="file", onchange='uploadFile()')`);
	});
});
