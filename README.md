# Virtual Folders

This was based on a [feature request](https://github.com/Microsoft/vscode/issues/39072). It allows you to define virtual folders in a separate view. So if you're working on a C++ project, you can have headers and source files organised separately.

If no virtual folders are defined in your preferences, it will simply group files by their extension. If you want you can close the standard Open Editors view.

Pros:

- keeps files organised
- sorts files in alphabetical order

Cons:

- doesn't show SCM status
- no close button
- doesn't show icons (at the moment)
- doesn't show foldername for files which aren't directly in the current workspace (at the moment)

## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.virtual-folders).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and type:

    > ext install virtual-folders

### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/virtual-folders).

## Configuration

The extension can be configured as follows:

`virtual-folders.folders`

Defines folder names with a list of globs to match files. E.g. for C++ you could use:

```
"virtual-folders.folders": {
    "type": "array",
    "description": "Virtual folders",
    "default": [
        {
            "name": "Headers",
            "files": [
                "**/*.h"
            ]
        },
        {
            "name": "Source",
            "files": [
                "**/*.cpp"
            ]
        }
    ]
}
```

## Known issues

Due to a vscode API limitation, files are only added to the view as they are opened. The downside of this is that when you reopen vscode, the view will be empty. As each file is visited, it will get added to the view.

### Credits

Icon by [Hopstarter](http://www.iconarchive.com/artist/hopstarter.html)