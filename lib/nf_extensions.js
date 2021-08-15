#target photoshop

function NFPsExtensions()
{
    /// COLOR

    SolidColor.WebHex = function (hexColor)
    {
        hexColor.replace('#', '')

        var color = new SolidColor
        color.rgb.hexValue = hexColor
        return color
    }

    SolidColor.RgbByte = function (r, g, b)
    {
        var color = new SolidColor
        color.rgb.red = r;
        color.rgb.green = g;
        color.rgb.blue = b;
        
        return color
    }
}

NFPsExtensions()