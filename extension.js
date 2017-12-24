
var vscode = require( 'vscode' );
var VirtualFolders = require( "./dataProvider" );

function activate( context )
{
    var provider = new VirtualFolders.VirtualFoldersDataProvider( context );
    vscode.window.registerTreeDataProvider( 'virtual-folders', provider );

    function refresh()
    {
        provider.refresh();
    }

    vscode.commands.registerCommand( 'virtual-folders.openFile', ( document ) =>
    {
        vscode.window.showTextDocument( document );
    } );

    context.subscriptions.push( vscode.commands.registerCommand( 'virtual-folders.refresh', refresh ) );

    vscode.window.onDidChangeVisibleTextEditors( function()
    {
        refresh();
    } );

    refresh();
}

function deactivate()
{
}

exports.activate = activate;
exports.deactivate = deactivate;
