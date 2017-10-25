'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const functions = [
    {
        label: "CreateNetworkConnection",  
        detail: "1.6.1", 
        kind: vscode.CompletionItemKind.Function, 
        documentation: new vscode.MarkdownString("**CreateNetworkConnection**\r\n * Parameter 1: idBinding\r\n * Parameter 2: strAddress\r\n * Parameter 3: strConnectionType\r\n\r\nFunction that defines a dynamic Network Connection so no Connection XML is required."), 
        insertText: new vscode.SnippetString("CreateNetworkConnection(${1:idBinding}, ${2:strAddress}, ${3:strConnectionType})$0")
    }
];

var arr = new Array(0);

// Construct completion items
functions.forEach(element => {
    var ci = new vscode.CompletionItem(element.label, element.kind);

    ci.detail = element.detail;
    ci.documentation = element.documentation;
    ci.insertText = element.insertText;

    arr.push(ci);
});

export const Functions = new vscode.CompletionList(arr);