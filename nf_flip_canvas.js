#target photoshop

#include 'lib/nf_include_this.js'

/*
    <javascriptresource>
        <name>Flip Canvas</name>
        <menu>filter</menu>
        <category>NF</category>
    </javascriptresource>
*/
function FlipCanvas()
{
    app.activeDocument.flipCanvas(Direction.HORIZONTAL)
}

app.nf.executeNoHistory(FlipCanvas)