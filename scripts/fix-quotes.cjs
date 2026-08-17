const fs = require('fs');
let data = fs.readFileSync('app/blog/data.ts', 'utf-8');

// Replace Chinese smart quotes \u201c and \u201d with corner brackets
// These are problematic inside JS string literals
data = data.replace(/\u201c/g, '\u300C'); // left double quote -> left corner bracket
data = data.replace(/\u201d/g, '\u300D'); // right double quote -> right corner bracket

fs.writeFileSync('app/blog/data.ts', data, 'utf-8');
console.log('Replaced all Chinese smart quotes with corner brackets');
console.log('Sample check:');
const lines = data.split('\n');
console.log(lines[10937]);
console.log(lines[10948]);