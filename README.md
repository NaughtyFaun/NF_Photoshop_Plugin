# Photoshop Plugin (JS)

A collection of tools I wrote by fevereshly googling how to do things I need in an automated way.
To make it work put it into your `Photoshop [version]/Presets/Scripts` folder.

Structure is pretty straightforward (so future me can pick it up easier):
* **lib** folder contains some helpers and wrappers. All you need is to add this line `#include 'lib/nf_include_this.js'` at the top of the script and you'll have `app.nf.` scope to access everything;
* each file outside **lib** folder represents a tool that can be accessed under "Filter" menu;
* every feature is placed under `app.nf.` "namespace";
* `nf_script_template.js` contains a template for new tools.

## lib folder
Writing PS scripts is much harder than it should be, so lib contains methods like:
  * *app.nf.layerToSmartObject*
  * *app.nf.setLayerTagColor*
  * *app.nf.findLayerOrSet* (recursive search by layer name as first argument and list of layers to start from as second)
  * *app.nf.executeNoHistory* (so you can undo whole script by just single Undo operation. Take that, ACTIONS!!)
  * etc.

## nf_setup_freq.js

Image frequency separation tool. Select a layer, hit the tool. It nicely handles nested layers and always put generated layers next to the one selected. If something fails, just try to run it again, chances are tool will clean up previous attempt.

## nf_shadow_light_vivid.js

Adds `softlight` and `multiply` layers next to selected one. Hold CTRL to add layers below selected. Hold SHIFT to also add `vividlight` layer along with others.
