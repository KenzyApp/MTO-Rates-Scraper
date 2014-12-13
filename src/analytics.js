var fs = require('fs');

var getMarkup = function (rate1, rate2) {
  var markup = (rate1/rate2) - 1;
  markup = markup * 100;
  markup = markup.toFixed(2);
  return markup;
};

var BOG_GBP = parseFloat(fs.readFileSync('global/BOG_GBP', 'utf8'));
var BOG_EUR = parseFloat(fs.readFileSync('global/BOG_EUR', 'utf8'));
var WU_GBP = parseFloat(fs.readFileSync('global/WU_GBP', 'utf8'));
var WU_EUR = parseFloat(fs.readFileSync('global/WU_EUR', 'utf8'));
var MG_GBP = parseFloat(fs.readFileSync('global/MG_GBP', 'utf8'));
var MG_EUR = parseFloat(fs.readFileSync('global/MG_EUR', 'utf8'));

console.log('GBP (UK)');
console.log('WU:', getMarkup(BOG_GBP, WU_GBP), '%');
console.log('MG:', getMarkup(BOG_GBP, MG_GBP), '%');

console.log('\nEUR (DE)');
console.log('WU:', getMarkup(BOG_EUR, WU_EUR), '%');
console.log('MG:', getMarkup(BOG_EUR, MG_EUR), '%');
