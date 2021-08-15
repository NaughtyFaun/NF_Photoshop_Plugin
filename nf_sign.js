#target photoshop

#include 'lib/nf_include_this.js'

/*
    <javascriptresource>
        <name>Add Sign</name>
        <menu>filter</menu>
        <category>NF</category>
    </javascriptresource>
*/
function AddSign()
{
    var signLayerName = "NF Sign"

    var doc = app.activeDocument
    
    app.nf.setUnitsToPixels()

    var grp = doc.layerSets.add()
    grp.name = signLayerName

    var signLayer = grp.artLayers.add()
    signLayer.name = signLayerName + " text"
    signLayer.kind = LayerKind.TEXT
    signLayer.textItem.contents = "Edit by Naughty Faun"
    
    signLayer.justification = Justification.LEFT
    signLayer.font            = "Arial"
    signLayer.textItem.color  = SolidColor.WebHex("000000")
    signLayer.textItem.antiAliasMethod = AntiAlias.SHARP
    signLayer.textItem.size   = Math.min(doc.width, doc.height) / 60.0
    signLayer.translate(doc.width * 0.3, doc.height * 0.5)

    app.nf.restoreSavedUnits()
}

app.nf.executeNoHistory(AddSign)