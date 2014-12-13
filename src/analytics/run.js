var markups = require('./analytics');

// Run
var data = markups();

console.log('GBP (UK)');
console.log('WU:', data.GBP.WU, '%');
console.log('MG:', data.GBP.MG, '%');

console.log('\nEUR (DE)');
console.log('WU:', data.EUR.WU, '%');
console.log('MG:', data.EUR.MG, '%');
