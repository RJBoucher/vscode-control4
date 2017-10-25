'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const hooks = [
    {
        label: "OnBindingChanged",  
        detail: "1.6.1", 
        kind: vscode.CompletionItemKind.Function, 
        documentation: new vscode.MarkdownString("**OnBindingChanged**\r\n * Parameter 1: idBinding\r\n * Parameter 2: strClass\r\n * Parameter 3: bIsBound\r\n\r\nFunction called by Director when a binding changes state (bound or unbound)"), 
        insertText: new vscode.SnippetString("OnBindingChanged(${1:idBinding}, ${2:strClass}, ${3:bIsBound})$0")
    },
    {
        label: "OnConnectionStatusChanged",  
        detail: "1.6.1", 
        kind: vscode.CompletionItemKind.Function, 
        documentation: new vscode.MarkdownString("**OnConnectionStatusChanged**\r\n * Parameter 1: idBinding\r\n * Parameter 2: nPort\r\n * Parameter 3: strStatus\r\n\r\nFunction based on this return from the system used by weatherbug driver to process the communication"), 
        insertText: "OnConnectionStatusChanged(idBinding, strClass, bIsBound)"
    },
];

var arr = new Array(0);

// Construct completion items
hooks.forEach(element => {
    var ci = new vscode.CompletionItem(element.label, element.kind);

    ci.detail = element.detail;
    ci.documentation = element.documentation;
    ci.insertText = element.insertText;

    arr.push(ci);
});

export const Hooks = new vscode.CompletionList(arr);