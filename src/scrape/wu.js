var GBP = {
  url: 'http://www.westernunion.co.uk/gb/Home.page',
  button: 'input[value="Calculate"]'
};

var EUR = {
  url: 'http://www.westernunion.de/de/Home.page',
  button: 'input[value="Berechnen"]'
};

var selectCountry = function () {
  var $select = $('#shoppingCountryTo');
  var _option = 'GH';
  $select.val(_option);
  $select.change();

  var $input = $('#amountToSend');
  $input.val('100');
};

var extractedRate;
var extractRate = function () {
  var rate = this.getElementInfo('#exchangeLabel').text.match(/\d+,\d+/)[0];
  extractedRate = rate.replace(',', '.');
};

var fs = require('fs');

// Main
var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});
casper.on('page.error', function () {
  console.log('');
});

// UK to GH
casper.start(GBP.url);
casper.thenEvaluate(selectCountry);
casper.thenClick(GBP.button);
casper.then(extractRate);
casper.then(function () {
  console.log('GBP (UK)', extractedRate);
  fs.write('global/WU_GBP', extractedRate, 'w');
});

// DE to GH
casper.thenOpen(EUR.url);
casper.thenEvaluate(selectCountry);
casper.thenClick(EUR.button);
casper.then(extractRate);
casper.then(function () {
  console.log('EUR (DE)', extractedRate);
  fs.write('global/WU_EUR', extractedRate, 'w');
});

casper.run();
