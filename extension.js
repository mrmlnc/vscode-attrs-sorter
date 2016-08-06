'use strict';

const vscode = require('vscode');
const htmlSorter = require('./lib/html');
const jadeSorter = require('./lib/jade');

function activate(context) {
	const processEditor = vscode.commands.registerTextEditorCommand('attrsSorter.processEditor', (textEditor) => {
		const options = vscode.workspace.getConfiguration('attrsSorter');
		const document = textEditor.document;
		const documentText = document.getText();
		const lastLine = document.lineAt(document.lineCount - 1);
		const selectAll = new vscode.Range(0, 0, lastLine.lineNumber, lastLine.range.end.character);

		if (!options.order.length) {
			options.order = null;
		}

		// Jade
		const lang = document.languageId;
		if (lang === 'jade') {
			textEditor.edit((editBuilder) => {
				editBuilder.replace(selectAll, jadeSorter(documentText, options));
			});
			return;
		}

		// HTML
		htmlSorter(documentText, options, (err, html) => {
			if (err) {
				vscode.window.showWarningMessage(err);
			}

			textEditor.edit((editBuilder) => {
				editBuilder.replace(selectAll, html);
			});
		});
	});

	context.subscriptions.push(processEditor);
}

exports.activate = activate;
