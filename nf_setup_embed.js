#target photoshop

#include 'lib/nf_include_this.js'


app.nf.EmbedSetup = function(layerTarget)
{
    this.layerOrig = layerTarget
    this.userLayerName = this.layerOrig.name

    this.isStopped = false
}

app.nf.EmbedSetup.prototype.initialize = function()
{
    this.origName    = this.userLayerName

    this.outerName   = this.origName.toUpperCase()
    this.innerName   = "Original"
    this.hueName     = "Hue " + '('+ this.origName +')'
    this.shadowName  = "Shadow " + '('+ this.origName +')'
    this.lightName   = "Light "  + '('+ this.origName +')'
    this.correctionName = "Correction " + '('+ this.origName +')'
}

app.nf.EmbedSetup.prototype.run = function()
{
    this.RequestName()
    if (this.isStopped) { return }
    this.initialize()
    this.createLayers()
}

app.nf.EmbedSetup.prototype.RequestName = function()
{
    this.window = new Window("dialog", "Group name");

    var topGrp = this.window.add ("group");
    topGrp.add("statictext", undefined, "Name:");
    var text = topGrp.add("edittext", undefined, this.userLayerName);
    text.characters = 20

    var botGrp = this.window.add ("group");
    var okBtn     = botGrp.add("button", undefined, "OK");
    var cancelBtn = botGrp.add("button", undefined, "Cancel");

    var self = this
    okBtn.onClick     = function() { self.userLayerName = text.text; self.window.close() }
    cancelBtn.onClick = function() { self.isStopped = true; self.window.close() }

    this.window.onShow = function () { myText.active = true }
    this.window.show();
}

app.nf.EmbedSetup.prototype.createLayers = function()
{
    var grpOuter = this.layerOrig.parent.layerSets.add()
    grpOuter.name = this.outerName

    var shadow  = grpOuter.artLayers.add()
    shadow.name = this.shadowName
    shadow.blendMode = BlendMode.MULTIPLY
    app.nf.setLayerTagColor(shadow, LayerTagColor.VIOLET)

    var light  = grpOuter.artLayers.add()
    light.name = this.lightName
    light.blendMode = BlendMode.SOFTLIGHT
    app.nf.setLayerTagColor(light, LayerTagColor.ORANGE)

    var grpInner = grpOuter.layerSets.add()
    grpInner.name = this.innerName
    grpInner.blendMode = BlendMode.NORMAL

    light.move(grpInner, ElementPlacement.PLACEBEFORE)
    shadow.move(grpInner, ElementPlacement.PLACEBEFORE)

    this.layerOrig.move(grpInner, ElementPlacement.INSIDE)

    var correction = grpInner.artLayers.add()
    correction.name = this.correctionName
    app.nf.setLayerTagColor(correction, LayerTagColor.BLUE)

    var hueSaturation = app.nf.addHueSaturationAdjustmentLayer(correction)
    hueSaturation.name = this.hueName

    app.nf.layerClipToBelow(shadow)
    app.nf.layerClipToBelow(light)
}



// <javascriptresource>
//     <name>Setup Embedded Image</name>
//     <menu>filter</menu>
//     <category>NF</category>
// </javascriptresource>
function RunEmbedSetup()
{
    var obj = new app.nf.EmbedSetup(app.activeDocument.activeLayer)
    obj.run()
}
app.nf.executeNoHistory(RunEmbedSetup)