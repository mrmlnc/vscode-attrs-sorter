'use strict';

const vscode = require('vscode');
const htmlSorter = require('./lib/html');
const jadeSorter = require('./lib/jade');

let output;

function sort(document, range) {
	const options = Object.assign({}, vscode.workspace.getConfiguration('attrsSorter'));
	if (options.order.length === 0) {
		options.order = null;
	}

	let text;
	if (range) {
		text = document.getText(range);
	} else {
		const lastLine = document.lineAt(document.lineCount - 1);
		const start = new vscode.Position(0, 0);
		const end = new vscode.Position(document.lineCount - 1, lastLine.text.length);

		range = new vscode.Range(start, end);
		text = document.getText();
	}

	// Jade
	const lang = document.languageId;
	if (lang === 'jade') {
		try {
			return Promise.resolve({
				text: jadeSorter(text, options),
				range
			});
		} catch (err) {
			return Promise.reject(err);
		}
	}

	// HTML
	return htmlSorter(text, options).then((result) => ({
		text: result.html,
		range
	}));
}

/**
 * Show message in output channel.
 */
function showOutput(msg) {
	msg = msg.toString();

	if (!output) {
		output = vscode.window.createOutputChannel('attrs-sorter');
	}

	output.clear();
	output.appendLine('[attrs-sorter]');
	output.append(msg);
	output.show();
}

function activate(context) {
	const supportedDocuments = [
		{ language: 'html', scheme: 'file' },
		{ language: 'jade', scheme: 'file' }
	];

	const command = vscode.commands.registerTextEditorCommand('attrsSorter.execute', (textEditor) => {
		sort(textEditor.document, null)
			.then((result) => {
				textEditor.edit((editBuilder) => {
					editBuilder.replace(result.range, result.text);
				});
			})
			.catch(showOutput);
	});

	const formatCode = vscode.languages.registerDocumentRangeFormattingEditProvider(supportedDocuments, {
		provideDocumentRangeFormattingEdits(document, range) {
			return sort(document, range).then((result) => {
				return [vscode.TextEdit.replace(range, result.text)];
			}).catch(showOutput);
		}
	});

	// Subscriptions
	context.subscriptions.push(command);
	context.subscriptions.push(formatCode);
}

exports.activate = activate;
