
// pattern is regex to match the common error
// options is the option that apper in the context menu when the user
// right clicks on an error this text will replace the text matched
// by the pattern so it important not to capture more text then
// can be replaced on with the option
// usageNote is the tool tips that apper on the left side of the screen
// when the cursor is within the bounds of the error

// there are three types error, warning and special
//   error errors with the text
//   warning there a error is likely to ocore but we can not be sure
//   special specail is reserved for string with specal meaning in
//   in pgdp eg. <i>italics</i>

const defaultText = '';

const ruleSet =
    [{'pattern': /\s;\s?/g, 'options': ['; '], 'type': 'error'},
      {'pattern': /\s:\s?/g, 'options': [': '], 'type': 'error'},
      {'pattern': /¾/g, 'options': ['1/3'], 'type': 'error', 'usageNote': 'wrong formatting of persentage ¾ sould be proofread as 3/4 '},
      {'pattern': /¼/g, 'options': ['1/4'], 'type': 'error', 'usageNote': 'wrong formatting of persentage ¼ sould be proofread as 1/4 '},
      {'pattern': /½/g, 'options': ['1/2'], 'type': 'error'},
      {'pattern': /^\s/g, 'options': [''], 'type': 'error', 'usageNote': 'Space at begining of line'},
      {'pattern': /(?:0-9]){,4}o/, 'options': ['°'], 'type': 'warning'},
      {'pattern': /(?:[a-z]|\s)\-$/g, 'options': ['-', '--'], 'usageNote': 'bring other half of word on to this line', 'type': 'error'},
      {'pattern': /\s{2,}/g, 'options': [' '], 'usageNote': 'double space', 'type': 'warning'},
      {'pattern': /\s-{1,4}\s/g, 'options': ['--'], 'usageNote': 'start a line with an em-dash. move the em-dash and first word of the sentance to previous line'},
      {'pattern': /\s?\(\s/g, 'options': [' ('], 'type': 'warning'},
      {'pattern': /\s\)\s?/g, 'options': [' )'], 'type': 'warning'},
      {'pattern': /\.\s\.\s\./g, 'options': ['...', '. ...'], 'type': 'error'},
      {'pattern': /\.\.\.\s(\.|\?|\!)/g, 'options': ['...'], 'type': 'error'},
      {'pattern': /\d{1,}(nd|rd|th|st)/g, 'options': [], 'usageNote': 'the part of place should be superscript eg.2<sup>nd</sup><br><br> eg 2^{nd}', 'type': 'warning'},
      {'pattern': /(\s|^)["|'](\s|$)/g, 'options': [], 'type': 'error'},
      {'pattern': /[1-9]\s[1-9]{1,}\/[1-9]{1,}/g, 'options': [], 'type': 'error'},
      {'pattern': /\s[\!|\?]/g, 'options': [], 'type': 'error'},
      {'pattern': /~/g, 'options': [], 'type': 'error'},
      {'pattern': /\b[=|\*]\b/gi, 'options': [], 'type': 'error'},
      {'pattern': /æ/g, 'options': ['[ae]'], 'type': 'warning'},
      {'pattern': /œ/g, 'options': ['[oe]'], 'type': 'warning'},
      {'pattern': /\_/g, 'options': ['-'], 'type': 'special'},
      {'pattern': /¯/g, 'options': [], 'type': 'error'},
      {'pattern': /¨/g, 'options': [], 'type': 'error'},
      {'pattern': /·/g, 'options': [], 'type': 'error'},
      {'pattern': /`/g, 'options': [], 'type': 'error'},
      {'pattern': /´/g, 'options': [], 'type': 'error'},
      {'pattern': /∨/g, 'options': [], 'type': 'error'},
      {'pattern': /∪/g, 'options': [], 'type': 'error'},
      {'pattern': /˜/g, 'options': [], 'type': 'error'},
      {'pattern': /¸/g, 'options': [], 'type': 'error'},
      {'pattern': /\^/g, 'options': [], 'type': 'special'},
      {'pattern': /(?:^|\w|\s)(\*)(?:\w|\s|$)/g, 'options': ['[*]'], 'type': 'warning'},
      {'pattern': /ſ/g, 'options': ['s', 'S'], 'type': 'error'},
      {'pattern': /[α-ωΑ-Ω]/g, 'options': [], 'type': 'error', 'usageNote': 'greek lettering see guide on wiki'},
      {'pattern': /\—/g, 'options': ['-', '--'], 'type': 'error'},
      {'pattern': /[†|‡|§]/g, 'options': ['[*]'], 'type': 'error', 'usageNote': 'please replace alterntive with aphophy *'},
      {'pattern': /(?:[a-z])[A-Z]{1,}/g, 'options': [], 'type': 'error'},
      {'pattern': /[\“|\”]/g, 'options': ['"'], 'type': 'error', 'usageNote': 'please replace with "'},
      {'pattern': /(?:\w)\"(?:\w)/g, 'options': [], 'type': 'error'},
      {'pattern': /\"\"/g, 'options': ['"'], 'type': 'error'},
      {'pattern': /[´|`]/g, 'options': ['\''], 'type': 'error'},
      {'pattern': /\w\s\-{1,}\s\w/g, 'options': [], 'type': 'error'},
      {'pattern': /\w\s\-{1,}/g, 'options': [], 'type': 'error'},
      // {'pattern': /-{3}/g, 'options': ['----', '--', '-'], 'type': 'error'},
      {'pattern': /\s\!/g, 'options': ['!'], 'type': 'error'},
      {'pattern': /^-[\w]/g, 'options': [], 'type': 'error'},
      {'pattern': /\w*\s('nt|'s|'re|n't|'is)/g, 'options': [], 'type': 'error'},
      {'pattern': /-{1,}/g, 'options': [], 'type': 'warning'},
      {'pattern': /\w\(/g, 'options': [], 'type': 'warning'},
      {'pattern': /\)\w/g, 'options': [], 'type': 'warning'},
      {'pattern': /^[0-9]{1,}$/g, 'options': [], 'type': 'warning', 'usageNote': 'please make sure you\'ve removed all page numbers'},
      {'pattern': /(?:[\w|;])\.{3}(?!\.)}/g, 'options': [], 'type': 'error'},
      {'pattern': /\.{3,4}(?:\w)/g, 'options': [], 'type': 'error'},
      {'pattern': /[\!|\.|\?]\s\.{3}/g, 'options': [], 'type': 'error'},
      {'pattern': /\"\'/g, 'options': [], 'type': 'warning'},
      {'pattern': /\/'/g, 'options': [], 'type': 'warning'},
      {'pattern': /''/g, 'options': ['"'], 'type': 'warning'},
      {'pattern': /\b1\b/g, 'options': [], 'type': 'warning'},
      {'pattern': /(?:\s|^)([b-hj-z]\b)/gi, 'options': [], 'type': 'warning'},
      {'pattern': /^(\}|\)|\])/gi, 'options': [], 'type': 'error'},
      {'pattern': /^(\,|\.|\?|\!)/gi, 'options': [], 'type': 'error'},
      {'pattern': /(?:\w)(\.)(?:\w)/g, 'options': ['. '], 'type': 'error'},
      // {"pattern": /[;|\.|\,|:]{2,}/g, "options":[] , "type": "error"},
      {'pattern': /¡/g, 'options': [], 'type': 'error'},
      {'pattern': /[0-9]S[0-9]/g, 'options': [], 'type': 'warning'},
      {'pattern': /\b\/(\w|$)/g, 'options': [], 'type': 'warning'},
      {'pattern': /(\s)(\"|\')$/g, 'options': [], 'type': 'error'},
      {'pattern': /^(;|:)/g, 'options': [], 'type': 'error'},
      {'pattern': /\w,\w/g, 'options': [], 'type': 'error'},
      {'pattern': /0\'/g, 'options': ['o'], 'type': 'warning'},
      {'pattern': /(?:\w)\.\.\.\s/g, 'options': [], 'type': 'warning'},
      {'pattern': /(?:\w)"(?:\w)/g, 'options': [], 'type': 'warning'},
      {'pattern': /(?:\w)(<|\{|\[)/g, 'options': [], 'type': 'warning'},
      {'pattern': /(&lt|{\]|\/)(?:\w)/g, 'options': [], 'type': 'warning'},
      {'pattern': /([A-Z]{2,})(?:[a-z])/g, 'options': [], 'type': 'warning'},
     // {'pattern': /(?:\b|\s|^)\.(\s)?\.(?!\.)/g, 'options': [], 'type': 'error'},
    ];
// rules to add
// H_{2}O, 0_{2}, CO_{2}
//  º
// [U+0400–U+04FF] celyrlic
// [Hebrew: **], or [Arabic: **].
// ( ) { }
// warnings
// ---
// ?...
// {"pattern": /\*/g, "options":["[*]"] , "type": "warning" },
// {"pattern": /\^/g, "options":[] , "type": "special"},
// {"pattern": /H20/gi, "options":["H_{2}O"] , "type": "warning"},
// {"pattern": /C2O/gi, "options":["C_{2}O"] , "type": "warning"},
// {"pattern": /O2/gi, "options":["O_{2}"] , "type": "warning"},
// [ \w
// .%
// «
// ..
// a pretty side dish/
// together1
// pan, and make the surface smooth. .Keep out
// Gravy Sou/i.
//
// A rich IVhite Soup.
// Peel an<L slice six large onions, six potatoes, six
// mash. Pick fifty crawfish, or a hundred prawns',
// Jelly to cox>er cold Fish.
// cups or basons to form cakes;and when cold, turn