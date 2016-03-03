'use strict';

var vscode = require('vscode');
var htmlSorter = require('./lib/html');
var jadeSorter = require('./lib/jade');

function activate(context) {
	var processEditor = vscode.commands.registerTextEditorCommand('attrsSorter.processEditor', function(textEditor) {
		var options = vscode.workspace.getConfiguration('attrsSorter') || {};
		var document = textEditor.document;
		var documentText = document.getText();
		var lastLine = document.lineAt(document.lineCount - 1);
		var selectAll = new vscode.Range(0, 0, lastLine.lineNumber, lastLine.range.end.character);

		// Jade
		var lang = document.languageId || document._languageId;
		if (lang === 'jade') {
			textEditor.edit(function(editBuilder) {
				editBuilder.replace(selectAll, jadeSorter(documentText, options));
			});
			return;
		}

		// HTML
		htmlSorter(documentText, options, function(err, result) {
			if (err) {
				vscode.window.showWarningMessage(err);
			}

			textEditor.edit(function(editBuilder) {
				editBuilder.replace(selectAll, result.html);
			});
		});
	});

	context.subscriptions.push(processEditor);
}

exports.activate = activate;
