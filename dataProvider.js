Object.defineProperty( exports, "__esModule", { value: true } );
var vscode = require( 'vscode' );
var path = require( "path" );
var minimatch = require( 'minimatch' );

var folders = {};

class VirtualFoldersDataProvider
{
    constructor( _context )
    {
        this._context = _context;

        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    getChildren( element )
    {
        if( !element )
        {
            if( folders !== undefined )
            {
                var folderList = [];

                for( var folder in folders )
                {
                    if( folders.hasOwnProperty( folder ) )
                    {
                        folderList.push( { folderElement: folder } );
                    }
                }
                return folderList;
            }
            return undefined;
        }
        else if( element.folderElement !== undefined )
        {
            return folders[ element.folderElement ];
        }
    }

    getTreeItem( element )
    {
        var item = new vscode.TreeItem();
        if( element.folderElement !== undefined )
        {
            item.label = element.folderElement;
            item.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        }
        else
        {
            item.label = element.name;
            item.collapsibleState = vscode.TreeItemCollapsibleState.None;
            item.command = {
                command: "virtual-folders.openFile",
                title: "",
                arguments: [
                    element.document
                ]
            };
        }

        return item;
    }

    refresh()
    {
        vscode.commands.executeCommand( 'setContext', 'virtual-folders-empty', true );

        folders = [];

        var documents = vscode.workspace.textDocuments;
        var config = vscode.workspace.getConfiguration( 'virtual-folders' ).folders;

        documents.map( function( document, i )
        {
            if( !document.isUntitled )
            {
                vscode.commands.executeCommand( 'setContext', 'virtual-folders-empty', false );

                var filepath = vscode.Uri.parse( document.uri.path ).fsPath;
                var name = path.basename( filepath );
                var ext = path.extname( filepath );

                let filePath = vscode.workspace.asRelativePath( document.fileName );

                if( !config || config.length === 0 )
                {
                    if( folders[ ext ] === undefined )
                    {
                        folders[ ext ] = [];
                    }
                    folders[ ext ].push( { name: name, path: filepath, document: document } );
                }
                else
                {
                    config.map( function( folder )
                    {
                        folder.files.map( function( glob )
                        {
                            if( minimatch( filePath, glob, { matchBase: true } ) )
                            {
                                if( folders[ folder.name ] === undefined )
                                {
                                    folders[ folder.name ] = [];
                                }
                                folders[ folder.name ].push( { name: name, path: filepath, document: document } );
                            }
                        } );
                    } );
                }
            }
        } );

        this._onDidChangeTreeData.fire();
    }
}
exports.VirtualFoldersDataProvider = VirtualFoldersDataProvider;
