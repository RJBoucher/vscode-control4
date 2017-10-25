'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as h from './hooks';
import * as f from './functions';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log("Activated");

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("lua", new HooksCompletionProvider(), "."));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("lua", new FunctionsCompletionProvider(), ":"));

    var cmd = vscode.commands.registerCommand('control4.package', () => {
        //var p = new vscode.ProcessExecution("../control4/DriverPackager.exe", null);
    });

    context.subscriptions.push(cmd);
}
  
// this method is called when your extension is deactivated
export function deactivate() { }

/**
 * Provides completion suggestions for Control4 hooks
 */
class HooksCompletionProvider implements vscode.CompletionItemProvider, vscode.Disposable {
    constructor() { }
  
    public dispose() { }
  
    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        if (context.triggerKind == vscode.CompletionTriggerKind.Invoke && position.character != 0) {
            var text = document.getText(new vscode.Range(position.line, 0, position.line, position.character));
            
            if (text.indexOf("function") < 0) {
                text = document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character));
                
                if (text != ".") {
                    return null;
                }
            }
        }

        return h.Hooks;
    }
}

/**
 * Provides completion suggestions for Control4 functions
 */
class FunctionsCompletionProvider implements vscode.CompletionItemProvider, vscode.Disposable {
    constructor() { 

    }
  
    public dispose() {
    }
  
    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        if (context.triggerKind == vscode.CompletionTriggerKind.Invoke) {
            return null;
        }

        var text = document.getText(new vscode.Range(position.line, position.character - 3, position.line, position.character - 1));

        if (text != "C4") {
            return null;
        }

        return f.Functions;
    }
}
