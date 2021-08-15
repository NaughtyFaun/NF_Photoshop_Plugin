#target photoshop

#include 'lib/nf_include_this.js'


app.nf.Freq = function(layerOrig)
{
    this.blurSuffix  = " low"
    this.llSuffix    = " high"
    this.grpSuffix   = " freq"
    this.debugSuffix = " I am debug"

    this.doc = app.activeDocument

    this.origName  = layerOrig.name
    this.blurName  = layerOrig.name + this.blurSuffix
    this.llName    = layerOrig.name + this.llSuffix
    this.grpName   = layerOrig.name + this.grpSuffix
    this.debugName = layerOrig.name + this.debugSuffix

    this.layerOrig = layerOrig
    this.layerBlur = undefined
    this.layerLL   = undefined
    this.grp       = undefined

    this.initialize()
}

app.nf.Freq.prototype.initialize = function()
{
    this.grp       = app.nf.findLayerOrSet(this.grpName, this.layerOrig.parent.layers)
    var layers     = this.grp ? this.grp.layers : undefined
    this.layerBlur = app.nf.findLayerOrSet(this.blurName, layers)
    this.layerLL   = app.nf.findLayerOrSet(this.llName, layers)
}


app.nf.Freq.prototype.run = function()
{
    if (this.layerOrig.isBackgroundLayer)
    {
        app.nf.showErrorMessage('Selected layer should not be a background layer.')
        return
    }
    if (this.layerOrig.hasOwnProperty('layers'))
    {
        app.nf.showErrorMessage('Group selected. You need to select a layer.')
        return
    }

    if (app.nf.hasDebugMarker(this.debugName) || !this.isCleared())
    {
        var res = app.nf.yesNoMessage('It seems there was an error last time.\nShould we clean up?')
        if (!res) { return }

        this.clearSetup()
    }


    app.nf.debugMarkerAdd(this.debugName)
    

    // the meat
    this.createLayers()
    app.nf.applyBlur(this.layerBlur)
    app.nf.subtractTwoLayers(this.layerLL, this.layerBlur)
    this.layerLL.blendMode = BlendMode.LINEARLIGHT


    app.nf.debugMarkerRemove(this.debugName)
}

app.nf.Freq.prototype.isCleared = function()
{
    return this.layerBlur == undefined && 
           this.layerLL == undefined && 
           this.grp == undefined
}

app.nf.Freq.prototype.clearSetup = function()
{
    app.nf.debugMarkerRemove(this.debugName)

    if (this.layerBlur != undefined) { this.layerBlur.remove() }
    if (this.layerLL   != undefined) { this.layerLL.remove() }
    if (this.grp       != undefined) { this.grp.remove() }

    this.layerBlur = undefined
    this.layerLL   = undefined
    this.grp       = undefined
}

app.nf.Freq.prototype.createLayers = function()
{
    var parent = this.layerOrig.parent

    // create layers
    if (this.layerOrig.kind != LayerKind.SMARTOBJECT)
    {
        // this.layerOrig.isBackgroundLayer = false
        this.doc.activeLayer = this.layerOrig
        app.nf.layerToSmartObject(this.layerOrig)

        this.doc.activeLayer = app.nf.findLayerOrSet(this.origName, parent.layers)
        this.layerOrig = this.doc.activeLayer
    }
    
    this.grp      = parent.layerSets.add()
    this.grp.name = this.grpName
    this.grp.move(this.layerOrig, ElementPlacement.PLACEBEFORE)

    this.layerBlur      = this.layerOrig.duplicate(this.grp, ElementPlacement.INSIDE)
    this.layerBlur.name = this.blurName

    this.layerLL      = this.layerOrig.duplicate(this.grp, ElementPlacement.INSIDE)
    this.layerLL.name = this.llName
    if (this.layerOrig.kind == LayerKind.SMARTOBJECT)
    {
        this.layerLL.rasterize(RasterizeType.ENTIRELAYER)
    }
}


/*
    <javascriptresource>
        <name>Setup Frequency</name>
        <menu>filter</menu>
        <category>NF</category>
    </javascriptresource>
 */
function RunFreq()
{
    var freq = new app.nf.Freq(app.activeDocument.activeLayer)
    freq.run()
}
app.nf.executeNoHistory(RunFreq)
