#target photoshop


LayerTagColor = 
{
    NONE:   "None",
    RED:    "Rd  ",
    ORANGE: "Orng",
    YELLOW: "Ylw ",
    GREEN:  "Grn ",
    BLUE:   "Bl  ",
    VIOLET: "Vlt ",
    GRAY:   "Gry "
}


/// LAYERS

app.nf.layerToSmartObject = function(layerTarget)
{
    if (layerTarget.kind == LayerKind.SMARTOBJECT) { return }
    app.activeDocument.activeLayer = layerTarget

    var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );
    executeAction( idnewPlacedLayer, undefined, DialogModes.NO );
}

app.nf.setLayerTagColor = function(layerTarget, tagColor)
{
    app.activeDocument.activeLayer = layerTarget

    var idsetd = charIDToTypeID( "setd" );
        var desc119 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref81 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref81.putEnumerated( idLyr, idOrdn, idTrgt );
        desc119.putReference( idnull, ref81 );
        var idT = charIDToTypeID( "T   " );
            var desc120 = new ActionDescriptor();
            var idClr = charIDToTypeID( "Clr " );
            var idClr = charIDToTypeID( "Clr " );
            var idRd = charIDToTypeID( tagColor );
            desc120.putEnumerated( idClr, idClr, idRd );
        var idLyr = charIDToTypeID( "Lyr " );
        desc119.putObject( idT, idLyr, desc120 );
    executeAction( idsetd, desc119, DialogModes.NO );
}


/// OPERATIONS

app.nf.applyBlur = function(targetLayer)
{
    app.activeDocument.activeLayer = targetLayer

    var idGsnB = charIDToTypeID( "GsnB" );
        var desc62 = new ActionDescriptor();
        var idRds = charIDToTypeID( "Rds " );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc62.putUnitDouble( idRds, idPxl, 8.000000 );
    executeAction( idGsnB, desc62, DialogModes.ALL );
}

app.nf.subtractTwoLayers = function(firstLayer, secondLayer)
{
    app.activeDocument.activeLayer = firstLayer

    // Image -> apply image
    var idAppI = charIDToTypeID( "AppI" );
        var desc17 = new ActionDescriptor();
        var idWith = charIDToTypeID( "With" );
            var desc18 = new ActionDescriptor();
            var idT = charIDToTypeID( "T   " );
                var ref4 = new ActionReference();
                var idChnl = charIDToTypeID( "Chnl" );
                var idChnl = charIDToTypeID( "Chnl" );
                var idRGB = charIDToTypeID( "RGB " );
                ref4.putEnumerated( idChnl, idChnl, idRGB );
                var idLyr = charIDToTypeID( "Lyr " );
                ref4.putName( idLyr, secondLayer.name );
            desc18.putReference( idT, ref4 );
            var idClcl = charIDToTypeID( "Clcl" );
            var idClcn = charIDToTypeID( "Clcn" );
            var idSbtr = charIDToTypeID( "Sbtr" );
            desc18.putEnumerated( idClcl, idClcn, idSbtr );
            var idScl = charIDToTypeID( "Scl " );
            desc18.putDouble( idScl, 2.000000 );
            var idOfst = charIDToTypeID( "Ofst" );
            desc18.putInteger( idOfst, 128 );
        var idClcl = charIDToTypeID( "Clcl" );
        desc17.putObject( idWith, idClcl, desc18 );
    executeAction( idAppI, desc17, DialogModes.NO );
}