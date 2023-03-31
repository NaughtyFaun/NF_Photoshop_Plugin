#target photoshop

#include'lib/nf_include_this.js'

function exportGroupsToFolder(panel, groups, path)
{
    panel.panel.show()

    // Loop through each top-level group
    for (var i = 0; i < groups.length; i++)
    {
        // Get the name of the group
        var groupName = groups[i].name;

        // Define the export file name and path
        var exportFileName = panel.askPrefix.text + groupName + ".png";
        var exportPath = path + "/" + exportFileName;

        panel.log[i].text = (i + 1) + ". " + exportPath;

        var pngOpts = new PNGSaveOptions;
        pngOpts.compression = 1;
        pngOpts.interlaced = false;
        var file = new File(exportPath);

        app.activeDocument.saveAs(file, pngOpts, true, Extension.LOWERCASE);

        panel.pb.value = i + 1;

        app.nf.waitForRedraw()
    }
}

/*
<javascriptresource>
    <name>Export Top Groups</name>
    <menu>filter</menu>
    <category>NF</category>
</javascriptresource>
*/
function exportGroupsToPng()
{
    // Get a reference to the active document
    var doc = app.activeDocument;
    // Get all top-level groups
    var topLevelGroups = doc.layerSets;

    var exportWnd = {}
    exportWnd.window = new Window('dialog', 'Export to PNG');

    // export path
    exportWnd.ask = exportWnd.window.add('panel', undefined, 'Export path');
    exportWnd.ask.preferredSize = [300, 10]

    // path group
    exportWnd.askPathGrp = exportWnd.ask.add('group');
    exportWnd.askPathGrp.orientation = 'row';

    exportWnd.askPath = exportWnd.askPathGrp.add('edittext', undefined, doc.path);
    exportWnd.askPath.preferredSize = [300, 10];

    exportWnd.askBtn = exportWnd.askPathGrp.add('button', undefined, '...');
    exportWnd.askBtn.preferredSize = [50, 10];
    exportWnd.askBtn.onClick = function ()
    {
        exportWnd.askPath.text = (Folder.selectDialog('Select export folder') + '').replace('%20', ' ', 'g');
    };

    // prefix group
    exportWnd.askPrefixGrp = exportWnd.ask.add('group');
    exportWnd.askPrefixGrp.orientation = 'row';
    exportWnd.askPrefixGrp.alignChildren = 'left';

    var label = exportWnd.askPrefixGrp.add('statictext', undefined, 'Prefix');
    label.preferredSize = [40, 10];
    exportWnd.askPrefix = exportWnd.askPrefixGrp.add('edittext', undefined, 'frames_');
    exportWnd.askPrefix.preferredSize = [300, 10];

    // export butn
    exportWnd.askRun = exportWnd.ask.add('button', undefined, 'Export');
    exportWnd.askRun.preferredSize = [50, 10];
    exportWnd.askRun.onClick = function ()
    {
        exportGroupsToFolder(exportWnd, topLevelGroups, exportWnd.askPath.text);
        $.sleep(1000);
        exportWnd.window.close()
    };


    // progress
    exportWnd.panel = exportWnd.window.add('panel', undefined, 'Progress')
    exportWnd.panel.preferredSize = [300, 100]
    exportWnd.panel.hide()

    exportWnd.pb = exportWnd.panel.add('progressbar', undefined, 'Progress')
    exportWnd.pb.bounds = [20, 20, 280, 31]
    exportWnd.pb.value = 0
    exportWnd.pb.maxvalue = topLevelGroups.length

    exportWnd.log = []
    for (var i = 0; i < topLevelGroups.length; i++)
    {
        exportWnd.log.push(exportWnd.panel.add('statictext', undefined, ''));
        exportWnd.log[i].preferredSize = [300, 20];
    }

    exportWnd.window.show();
}

exportGroupsToPng();