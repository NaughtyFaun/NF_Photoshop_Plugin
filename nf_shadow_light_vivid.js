#target photoshop

#include 'lib/nf_include_this.js'


app.nf.ShadowLight = function(layerTarget)
{
    this.shadowPrefix = "Shadow "
    this.lightPrefix  = "Light "
    this.vividPrefix  = "Vivid "

    this.layerTarget = layerTarget
    this.targetName  = layerTarget.name
    this.shadowName  = this.shadowPrefix + '('+ this.targetName +')'
    this.lightName   = this.lightPrefix  + '('+ this.targetName +')'
    this.vividName   = this.vividPrefix  + '('+ this.targetName +')'

    this.initialize()
}

app.nf.ShadowLight.prototype.initialize = function()
{

}

app.nf.ShadowLight.prototype.run = function()
{
    this.createLayers(
                ScriptUI.environment.keyboardState.shiftKey,
                ScriptUI.environment.keyboardState.ctrlKey)
}

app.nf.ShadowLight.prototype.createLayers = function(hasVivid, isAfter)
{
    var layers = []

    var shadow  = this.layerTarget.parent.artLayers.add()
    shadow.name = this.shadowName
    shadow.blendMode = BlendMode.MULTIPLY
    app.nf.setLayerTagColor(shadow, LayerTagColor.VIOLET)
    layers.push(shadow)

    var light  = this.layerTarget.parent.artLayers.add()
    light.name = this.lightName
    light.blendMode = BlendMode.SOFTLIGHT
    app.nf.setLayerTagColor(light, LayerTagColor.ORANGE)
    layers.push(light)

    if (hasVivid)
    {
        var vivid  = this.layerTarget.parent.artLayers.add()
        vivid.name = this.vividName
        vivid.blendMode = BlendMode.VIVIDLIGHT
        app.nf.setLayerTagColor(vivid, LayerTagColor.YELLOW)
        layers.push(vivid)
    }

    app.nf.movePreserveOrder(this.layerTarget, layers, isAfter)
}


/*
    <javascriptresource>
        <name>Add Shadow Light Vivid (ctrl, shft)</name>
        <menu>filter</menu>
        <category>NF</category>
    </javascriptresource>
 */
function RunShadowLight()
{
    var obj = new app.nf.ShadowLight(app.activeDocument.activeLayer)
    obj.run()
}
app.nf.executeNoHistory(RunShadowLight)