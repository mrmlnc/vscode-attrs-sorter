'use strict';

var vscode = require('vscode');
var posthtml = require('posthtml');
var attrsSorter = require('posthtml-attrs-sorter');

function activate(context) {
	var processEditor = vscode.commands.registerTextEditorCommand('attrsSorter.processEditor', function(textEditor) {
		var options = vscode.workspace.getConfiguration('attrsSorter') || {};
		var document = textEditor.document;
		var documentText = document.getText();
		posthtml()
			.use(attrsSorter(options))
			.process(documentText)
			.then(function(result) {
				var lastLine = document.lineAt(document.lineCount - 1);
				var selectAll = new vscode.Range(0, 0, lastLine.lineNumber, lastLine.range.end.character);
				textEditor.edit(function(editBuilder) {
					editBuilder.replace(selectAll, result.html);
				});
			})
			.catch(function(err) {
				vscode.window.showWarningMessage(err);
			});
	});

	context.subscriptions.push(processEditor);
}

exports.activate = activate;
