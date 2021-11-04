const Quill = require('quill'),
    editor = new Quill('#editor',
        {
            modules:
                {
                    toolbar: {container: '#toolbar'},
                    'image-tooltip': true,
                    'link-tooltip': true
                },
            theme: 'snow'

        }),

    fs = require('fs'),
    remote = require('electron').remote,
    dialog = remote.require('electron').dialog;

let loadedFs;

function saveFile()
{
    if(!loadedFs)
    {
        dialog.showSaveDialog(
            {
                filters:
                    [
                        { name: 'txt', extensions: ['txt'] },
                        { name: 'html', extensions: ['html'] },
                    ]
            },
            function(filename)
            {
                if(filename === undefined) return;
                writeToFile(editor, filename);
            });
    }
    else {
        writeToFile(editor, loadedFs);
    }
}

function loadFile()
{
    dialog.showOpenDialog(
        {
            filters:
                [
                    { name: 'txt', extensions: ['txt', 'html'] },
                    { name: 'html', extensions: ['html', 'txt'] },
                ]
        },
        function(filenames)
        {
            if(filenames === undefined) return;
            const filename = filenames[0];
            readFromFile(editor, filename);
            loadedFs = filename;
        })
}

function writeToFile(editor, filename)
{
    const html = editor.getHTML();
    fs.writeFile(filename, html, function(err)
    {
        if (err)
        {
            return console.log(err);
        }
    });
}

function readFromFile(editor, filename)
{
    fs.readFile(filename, "utf-8", function(err, data)
    {
        if (err)
        {
            console.log(err);
        }
        editor.setHTML(data);
    });
}
