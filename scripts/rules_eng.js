// this is a simple program based on linter for programing
// that are meant to assure syntactical consistency

// pattern is regex to match the common error
//scope is the what the what lines the rule works on for example
export let ruleSet = 
    [{ "pattern": /\s;\s?/g, "options": ["; "], "type": "error" },
    { "pattern": /\s:\s?/g, "options": [": "] , "type": "error" },
    { "pattern": /¾/g, "options": ["1/3"], "type": "error","usageNote": "wrong formatting of persentage ¾ sould be proofread as 3/4 " },
    { "pattern": /¼/g, "options": ["1/4"], "type": "error" },
    { "pattern": /½/g, "options": ["1/2"], "type": "error" },
    { "pattern": /^\s/g, "options": [""], "type": "error" },
    { "pattern": /\w\.{1,4}\w/g, "options": [" ... "], "type": "error" },
    { "pattern": /[0-9]{,4}o/, "options": ["°"], "type": "warning"  },
    { "pattern": /-?-$/g, "options": ["-", "--"], "usageNote":"bring other half of word on to this line", "type": "error"},
    { "pattern": /\s{2,}/g, "options": [" "], "usageNote": "double space",  "type": "warning" },
    { "pattern": /\s-{1,4}\s/g, "options": ["--"], "usageNote": "start a line with an em-dash. move the em-dash and first word of the sentance to previous line" },
    { "pattern": /^-{1,4}/g, "options": ["--"],  "type": "error" },
    { "pattern":  /\s?\(\s/g, "options": [" ("] , "type": "warning"  },
    { "pattern":  /\s\)\s?/g, "options": [" )"],  "type": "warning"  },
    { "pattern": /\.\s\.\s\./g, "options": ["...", ". ..."], "type": "error"  },
    { "pattern": /\.\.\.\s[\.|\?|\!]/g , "options": ["..."], "type": "error" },
    { "pattern": /\d{1,}(nd|rd|th|st)/g, "options":[], "usageNote": "the part of place should be subscript eg.2<sub>nd</sub>", "type": "error"  },
    { "pattern": /\s"\s/g, "options":[] , "type": "error"  },
    { "pattern": /[1-9]\s[1-9]{1,}\/[1-9]{1,}/g, "options":[] , "type": "error" },
    { "pattern": /\s[\!|\.|\?]/g, "options":[] , "type": "error" },
    { "pattern": /~/gi, "options":[] , "type": "error" },
    { "pattern": /\d[-|=|*]\d/gi, "options":[] , "type": "error" },
    { "pattern": /\*/gi, "options":["[*]"] , "type": "warning" },
    { "pattern": /æ/gi, "options":["[ae]"] , "type": "warning"},
    { "pattern": /œ/gi, "options":["[oe]"] , "type": "warning"},
    { "pattern": "_", "options":[""] , "type": "special"},
    { "pattern": "^", "options":[""] , "type": "special"},
    { "pattern": "H20", "options":["H_{2}O"] , "type": "special"},
    {}
]
// rules to add
// rules to add space before end of line mark
// 1+1 to 1 + 1  same with = 
// * to [*] warning 
// æ œ
// _ between word instead of -
///[α-ωΑ-Ω]*/
//—
// ... correct
// ¯ ¨ · ` ´ ˆ ∨ ∪ ˜¸
// H_{2}O.
// remove -- eol warning
//  º
// *, †, ‡, §, replace with *
// [U+0400–U+04FF] celyrlic
// [Hebrew: **], or [Arabic: **].
// ( ) { }
// warnings
// ſ long s 
// `
// “ ”. 
// would n't 't is did n't 
// ---
//?...