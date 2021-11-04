'use strict';

const electron = require('electron'),
	app = electron.app,
	BrowserWindow = electron.BrowserWindow;


let mainWindow = null;

app.on('window-all-closed', function()
{
	if (process.platform !== 'darwin')
	{
		app.quit();
	}
});

app.on('ready', function()
{
	mainWindow = new BrowserWindow(
		{
			'width': 900,
			'height': 650,
			'minWidth': 360,
			'minHeight': 300,
			'icon': __dirname + '/images/icon.png',
			'frame': false,
		});

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function()
	{
		mainWindow = null;
	});
});
