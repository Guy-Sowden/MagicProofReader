// this is a simple program based on linter for programing
// that are meant to assure syntactical consistency

// pattern is regex to match the common error
// scope is the what the what lines the rule works on for example

const defultText = 'this will not replace close secutny of the text.';

export const ruleSet =
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
      {'pattern': /\d{1,}(nd|rd|th|st)/g, 'options': [], 'usageNote': 'the part of place should be superscript eg.2<sup>nd</sup><br><br> eg 2^{nd}', 'type': 'error'},
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
      {'pattern': /-{3}/g, 'options': ['----', '--', '-'], 'type': 'error'},
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
      {'pattern': /''/g, 'options': [], 'type': 'warning'},
      {'pattern': /\b1\b/g, 'options': [], 'type': 'warning'},
      {'pattern': /(?:\s|^)([b-hj-z]\b)/gi, 'options': [], 'type': 'warning'},
      {'pattern': /^(\}|\)|\])/gi, 'options': [], 'type': 'error'},
      {'pattern': /^(\,|\.|\?|\!)/gi, 'options': [], 'type': 'error'},
      {'pattern': /(?:\w)(\.)(?:\w)/g, 'options': [], 'type': 'error'},
      // {"pattern": /[;|\.|\,|:]{2,}/g, "options":[] , "type": "error"},
      {'pattern': /¡/g, 'options': [], 'type': 'error'},
      {'pattern': /[0-9]S[0-9]/g, 'options': [], 'type': 'warning'},
      {'pattern': /\b\/(\w|$)/g, 'options': [], 'type': 'warning'},
      {'pattern': /(\s)(\"|\')$/g, 'options': [], 'type': 'error'},
      {'pattern': /^(;|:)/g, 'options': [], 'type': 'error'},
      {'pattern': /\w,\w/g, 'options': [], 'type': 'error'},
    // {"pattern": /Figure\:? [0-9]/gi, "options":[] , "type": "warning"},
    ];
// rules to add
// rules to add space before end of line mark
// 1+1 to 1 + 1  same with = done
// * to [*] warning done
// æ œ done
// _ between word instead of - Done
// /[α-ωΑ-Ω]*/ Done
// —
// ... correct Done
// ¯ ¨ · ` ´ ˆ ∨ ∪ ˜¸Done
// H_{2}O, 0_{2}, CO_{2}
// remove -- eol warning
//  º
// *, †, ‡, §, replace with * Done
// [U+0400–U+04FF] celyrlic
// [Hebrew: **], or [Arabic: **].
// ( ) { }
// warnings
// ſ long s done
// `
// “ ”. done
// would n't 't is did n't what 's  they 're does n't /done
// ---
// ?...
// {"pattern": /\*/g, "options":["[*]"] , "type": "warning" },
// {"pattern": /\^/g, "options":[] , "type": "special"},
// {"pattern": /H20/gi, "options":["H_{2}O"] , "type": "warning"},
// {"pattern": /C2O/gi, "options":["C_{2}O"] , "type": "warning"},
// {"pattern": /O2/gi, "options":["O_{2}"] , "type": "warning"},
// \w"\w
// 0'
// Captitals in middle of word partaily done
// [ \w


// a)prean
// They -they make the sky look done
// '
// -'
// ¡
// .-
// .[*]
// --?
