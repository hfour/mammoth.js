var assert = require("assert");
var path = require("path");
var mammoth = require("../");

var test = require("./test")(module);

var dataFile = (filename)=>`test-data/custom-numbering/${filename}`;
var testName = (filename)=> `should convert ${filename}`;

var tests = {
    'letters-lowercase-brackets.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerLetter','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'4','numId':'15'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerLetter','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'4','numId':'15'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerLetter','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'4','numId':'15'}">Three</li>
    </ol>
    `},

    'letters-lowercase-dot.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerLetter','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'6','numId':'13'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerLetter','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'6','numId':'13'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerLetter','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'6','numId':'13'}">Three</li>
    </ol>
    `},

    'letters-uppercase-brackets.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'upperLetter','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'7','numId':'12'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperLetter','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'7','numId':'12'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperLetter','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'7','numId':'12'}">Three</li>
    </ol>
    `},

    'letters-uppercase-dot.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'upperLetter','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'7','numId':'12'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperLetter','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'7','numId':'12'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperLetter','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'7','numId':'12'}">Three</li>
    </ol>
    `},

    'numbers-brackets.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'8','numId':'9'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'8','numId':'9'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'8','numId':'9'}">Three</li>
    </ol>
    `},

    'numbers-dot.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'7','numId':'10'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'7','numId':'10'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'7','numId':'10'}">Three</li>
    </ol>
    `},

    'numbers-none.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1','lvlJc':'left','abstractNumId':'9','numId':'11'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1','lvlJc':'left','abstractNumId':'9','numId':'11'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1','lvlJc':'left','abstractNumId':'9','numId':'11'}">Three</li>
    </ol>
    `},

    'roman-lowercase-brackets.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerRoman','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'14','numId':'16'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerRoman','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'14','numId':'16'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerRoman','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'14','numId':'16'}">Three</li>
    </ol>
    `},

    'roman-lowercase-dot.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerRoman','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'9','numId':'16'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerRoman','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'9','numId':'16'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'lowerRoman','start':'1','lvlText':'%1.','lvlJc':'left','abstractNumId':'9','numId':'16'}">Three</li>
    </ol>
    `},

    'roman-uppercase-brackets.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'upperRoman','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'9','numId':'17'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperRoman','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'9','numId':'17'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperRoman','start':'1','lvlText':'(%1)','lvlJc':'left','abstractNumId':'9','numId':'17'}">Three</li>
    </ol>
    `},
    
    'roman-uppercase-dot.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'upperRoman','start':'1','lvlText':'%1.','lvlJc':'right','abstractNumId':'12','numId':'16'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperRoman','start':'1','lvlText':'%1.','lvlJc':'right','abstractNumId':'12','numId':'16'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'upperRoman','start':'1','lvlText':'%1.','lvlJc':'right','abstractNumId':'12','numId':'16'}">Three</li>
    </ol>
    `},

    'lvlOverride-numbers-dot.docx': { output: `
    <ol>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1 DOT!','lvlJc':'left','override':{},'abstractNumId':'7','numId':'10'}">One</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1 DOT!','lvlJc':'left','override':{},'abstractNumId':'7','numId':'10'}">Two</li>
    <li data-numbering="{'ilvl':'0','numFmt':'decimal','start':'1','lvlText':'%1 DOT!','lvlJc':'left','override':{},'abstractNumId':'7','numId':'10'}">Three</li>
    </ol>
    `},
}

function concatHtml(html) {
    return html.replace(/>\s+/g, '>').replace(/\s+</g,'<').trim();
}


Object.keys(tests).forEach((filename)=>{
    test(testName(filename), function() {
        var docxPath = path.join(__dirname, dataFile(filename));
        var out = tests[filename].output;
        out = concatHtml(out.trim());
        return mammoth.convertToHtml({path: docxPath}).then(function(result) {
            assert.equal(result.value, out);
        });
    })
});
