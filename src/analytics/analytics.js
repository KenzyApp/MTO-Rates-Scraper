var fs = require('fs');

// Data
var BOG_GBP = parseFloat(fs.readFileSync('global/BOG_GBP', 'utf8'));
var BOG_EUR = parseFloat(fs.readFileSync('global/BOG_EUR', 'utf8'));
var WU_GBP = parseFloat(fs.readFileSync('global/WU_GBP', 'utf8'));
var WU_EUR = parseFloat(fs.readFileSync('global/WU_EUR', 'utf8'));
var MG_GBP = parseFloat(fs.readFileSync('global/MG_GBP', 'utf8'));
var MG_EUR = parseFloat(fs.readFileSync('global/MG_EUR', 'utf8'));

// Util
var getMarkup = function (rate1, rate2) {
  var markup = (rate1/rate2) - 1;
  markup = markup * 100;
  markup = markup.toFixed(2);
  return markup;
};

// Export
var getAllMarkups = module.exports = function () {
  return {
    GBP: {
      WU: getMarkup(BOG_GBP, WU_GBP),
      MG: getMarkup(BOG_GBP, MG_GBP)
    },
    EUR: {
      WU: getMarkup(BOG_EUR, WU_EUR),
      MG: getMarkup(BOG_EUR, MG_EUR)
    }
  };
};
