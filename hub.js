// hub.js
// James Staub
// Nashville Public Library
// 20150402
hub = function(svgid, content, libraryName) {
// OPTIONS
        options = {
// MEDIABANK LABEL: diameterLabel=7/4in=126px; diameterBarcode=23/16in=103.5px, centerQuiet=3/4in=54px, text=1/8in=9px; paddingLabel=1/8in=9px
// BAYSCAN LABEL: diameter=1.5"=108px, centerquiet=.75"=54
// padding unknown=.25"=18px
                diameterLabel: 1.75,
//              paddingLabel: .125,
                paddingLabel: 0,
                diameterBarcode: 1.4375,
                centerQuiet: .75,
                fontSize: 6/72,
                format: "EAN8",
                displayValue: true,
                fontFamily: "Lucida Sans",
//              fontFamily: "monospace",
                backgroundColor:"#fff",
                lineColor:"#000",
//              libraryName: "NASHVILLE PUBLIC LIBRARY",
                libraryName: libraryName
        };
options.fontSize = parseFloat(options.fontSize)
// ENCODE THE NUMERAL in EAN-8 BINARY
        var encoder = new window[options.format](content);
        var binary = encoder.encoded();
// GIVE THE SVG HEIGHT AND WIDTH AND SET INCHES AS THE DEFAULT UNIT
        var svg = document.getElementById(svgid);
        svg.setAttribute("height", options.diameterLabel + options.paddingLabel + "in");
        svg.setAttribute("width", options.diameterLabel + options.paddingLabel + "in");
        svg.setAttribute("viewBox", "0,0," + (options.diameterLabel + options.paddingLabel) + "," + (options.diameterLabel + options.paddingLabel));
// DRAW THE LIBRARY NAME ON TOP
        var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        svg.appendChild(defs);
        var pathTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathTop.setAttribute("id", "pathTop")
        pathTop.setAttribute("d","M " + (options.paddingLabel/2 + options.fontSize*1.5) + "," + (options.diameterLabel/2 + options.paddingLabel/2) + " A " + (options.diameterLabel/2 - options.fontSize*1.5) + "," + (options.diameterLabel$
        pathTop.setAttribute("stroke", options.lineColor);
//      pathTop.setAttribute("stroke-width", 1);
        defs.appendChild(pathTop);
        var textTop = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textTop.setAttribute("font-size", options.fontSize);
        textTop.setAttribute("text-anchor", "middle")
        svg.appendChild(textTop);
        var textPathTop = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPathTop.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href","#pathTop");
        textPathTop.setAttribute("startOffset", "50%");
        textPathTop.setAttribute("font-family", options.fontFamily);
        textPathTop.textContent = options.libraryName;
        textTop.appendChild(textPathTop);
// DRAW THE BARCODE NUMERAL ON BOTTOM
        var pathBottom = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathBottom.setAttribute("id", "pathBottom")
        pathBottom.setAttribute("d","M " + (options.paddingLabel/2 + options.fontSize*.75) + "," + (options.diameterLabel/2 + options.paddingLabel/2) + " A " + (options.diameterLabel/2 - options.fontSize*.75) + "," + (options.diameterLa$
        pathBottom.setAttribute("stroke", options.lineColor);
        defs.appendChild(pathBottom);
        var textBottom = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textBottom.setAttribute("font-size", options.fontSize);
        textBottom.setAttribute("text-anchor", "middle")
        svg.appendChild(textBottom);
        var textPathBottom = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPathBottom.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href","#pathBottom");
        textPathBottom.setAttribute("dominant-baseline", "central");
        textPathBottom.setAttribute("startOffset", "50%");
        textPathBottom.setAttribute("font-family", options.fontFamily);
        textPathBottom.textContent = content;
        textBottom.appendChild(textPathBottom);
// DRAW THE BARCODE NUMERAL THROUGH THE CENTER
        var textCenter = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textCenter.setAttribute("font-size", options.centerQuiet/7);
        textCenter.setAttribute("x", ((options.diameterLabel + options.paddingLabel)/2));
        textCenter.setAttribute("y", ((options.diameterLabel + options.paddingLabel)/2 + options.centerQuiet/7/2));
        textCenter.setAttribute("font-family", options.fontFamily);
        textCenter.setAttribute("text-anchor", "middle")
        textCenter.textContent = content;
        svg.appendChild(textCenter);
// DRAW THE CIRCULAR BARCODE
        var r = options.centerQuiet/2;
        var strokeWidth = ((options.diameterBarcode - options.centerQuiet)/2) / 67; //67 bits for the EAN8, ? 3 extra for padding outer buffer
        for(var i=0;i<binary.length;i++){
                r += strokeWidth;
                if(binary[i] == "1"){
                        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace
                        circle.setAttribute("cx", (options.diameterLabel + options.paddingLabel)/2);
                        circle.setAttribute("cy", (options.diameterLabel + options.paddingLabel)/2);
                        circle.setAttribute("r", r);
                        circle.setAttribute("stroke", options.lineColor);
                        circle.setAttribute("stroke-width", strokeWidth);
                        circle.setAttribute("fill-opacity", 0);
                        svg.appendChild(circle);
                }
        }
}
