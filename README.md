# Photoshop Plugin (JS)

A collection of tools I wrote by fevereshly googling how to do things I need in an automated way.
To make it work put it into your `Photoshop [version]/Presets/Scripts` folder.

Structure is pretty straight forward (so future me can pick it up easier):
* **lib** folder contains some helpers and wrappers. All you need is to add this line `#include 'lib/nf_include_this.js'`;
* each file outside **lib** folder represents a tool that can be accessed under "Filter" menu;
* `nf_script_template.js` contains a tamplate for new tools.


## nf_freq.js

Image frequency separation tool. Select a layer, hit the tool. It nicely handles nested layers and always put generated layers next to the one selected. If something fails, just try to run it again, chanses are tool will clean up previous attempt.

## nf_shadow_light_vivid.js

Adds `softlight` and `multiply` layers next to selected one. Hold CTRL to add layers below selected. Hold SHIFT to also add `vividlight` layer along with others.
