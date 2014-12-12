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

var extractRate = function () {
  var rate = this.getElementInfo('#exchangeLabel').text.match(/\d+,\d+/)[0];
  console.log(rate.replace(',', '.'));
};

// Main
var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});
casper.on('log', function () {});

// UK to GH
casper.start(GBP.url);
casper.thenEvaluate(selectCountry);
casper.thenClick(GBP.button);
casper.then(function () {
  console.log('GBP (UK)');
});
casper.then(extractRate);

// DE to GH
casper.thenOpen(EUR.url);
casper.thenEvaluate(selectCountry);
casper.thenClick(EUR.button);
casper.then(function () {
  console.log('EUR (DE)');
});
casper.then(extractRate);

casper.run();
