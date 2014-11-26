var url = 'http://www.westernunion.co.uk/gb/Home.page';

var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});

casper.start(url);

casper.thenEvaluate(function () {
  var $select = $('#shoppingCountryTo');
  var _option = 'GH';
  $select.val(_option);
  $select.change();

  var $input = $('#amountToSend');
  $input.val('100');
});

casper.thenClick('input[value="Calculate"]');

casper.then(function () {
  var rate = this.getElementInfo('#exchangeLabel').text.match(/\d+,\d+/)[0];
  console.log('[Western Union] Result: GBP 1 = GHS', rate.replace(',', '.'));
});

casper.run();
