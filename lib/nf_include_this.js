#target photoshop

function NFInitialize()
{
    if (app.nf == undefined) { app.nf = {}; }
    if (app.nf.isInitialized) { return; }
    app.nf.isInitialized = true

    app.nf.backup = {}


    app.nf.findByName = function(name)
    {
        for (var i = 0; i < this.length; i++)
        {
            var layer = this[i]
            if (layer.name == name)
            {
                return layer
            }
        }

        return undefined
    }

    app.nf.findLayerOrSet = function(name, layers)
    {
        if (!documents.length) { alert("No active document"); return undefined; }
        if (layers === undefined || layers === app.activeDocument) 
        {
             layers = app.activeDocument.layers 
        }
        
        if (app.nf.findByName.call(layers, name))
        {
            return layers.getByName(name)
        }

        for(var i = 0; i < layers.length; i++)
        {
            if (layers[i].hasOwnProperty('layers'))
            {
                return app.nf.findLayerOrSet(name, layers[i].layers)
            }
        }

        return undefined
    }

    app.nf.movePreserveOrder = function(layerPivot, layers, isAfter)
    {
        var movePlace = isAfter ? ElementPlacement.PLACEAFTER : ElementPlacement.PLACEBEFORE

        var local = layers.slice(0, layers.length)
        
        if (!isAfter) { local.reverse() }

        for(var i = 0; i < local.length; i++)
        {
            local[i].move(layerPivot, movePlace)
        }
    }

    app.nf.hasDebugMarker = function(name)
    {
        return app.nf.findLayerOrSet(name) != undefined
    }

    app.nf.debugMarkerAdd = function(name)
    {
        var marker = app.nf.findLayerOrSet(name)
        if (marker != undefined)
        {
            throw 'Marker layer with name' + name + 'already exists'
        }

        marker = app.activeDocument.artLayers.add()
        marker.name = name
    }

    app.nf.debugMarkerRemove = function(name)
    {
        var marker = app.nf.findLayerOrSet(name)
        if (marker != undefined) { marker.remove() }
    }

    app.nf.setUnitsTo = function (ur, ut)
    {
        app.nf.backup.rulerUnits = preferences.rulerUnits
        app.nf.backup.typeUnits  = preferences.typeUnits

        preferences.rulerUnits = ur
        preferences.typeUnits  = ut
    }

    app.nf.setUnitsToPixels = function ()
    {
        app.nf.setUnitsTo(Units.PIXELS, TypeUnits.PIXELS)
    }

    app.nf.restoreSavedUnits = function ()
    {
        preferences.rulerUnits = app.nf.backup.rulerUnits
        preferences.typeUnits  = app.nf.backup.typeUnits

        app.nf.backup.rulerUnits = undefined
        app.nf.backup.typeUnits  = undefined
    }
    
    // Executes code without recording each step into the Ps.History
    app.nf.executeNoHistory = function(func)
    {
        if (!documents.length) { alert("No active document"); return; }

        app.activeDocument.suspendHistory('History ' + func.name,  func.name + '()')
    }
}

NFInitialize()

#include nf_wrappers.js
#include nf_extensions.js
#include nf_ui.js