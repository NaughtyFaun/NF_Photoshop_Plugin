#target photoshop

#include 'lib/nf_include_this.js'


app.nf.ClassName = function(layerTarget)
{
    this.initialize()
}

app.nf.ClassName.prototype.initialize = function()
{

}

app.nf.ClassName.prototype.run = function()
{

}


///*
    // <javascriptresource>
    //     <name>Menu item name</name>
    //     <menu>filter</menu>
    //     <category>NF</category>
    // </javascriptresource>
// */
function RunClassName()
{
    var obj = new app.nf.ClassName(app.activeDocument.activeLayer)
    obj.run()
}
app.nf.executeNoHistory(RunClassName)