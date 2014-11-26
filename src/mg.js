var url = 'http://www.moneygram.com/wps/portal/moneygramonline/home/sendmoney?CC=GB&LC=en-GB&cp=set';

var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});
casper.on('remote.message', function (msg) {
  if (msg.indexOf('[Moneygram]') === 0) {
    console.log(msg);
  }
});

// Start
casper.start(url);

casper.thenEvaluate(function () {
  var $select = $('.webtrendsGB_country');
  var _option = 'GHA';
  $select.val(_option);
  $select.change();
});

casper.waitForText("GHS", function() {
  casper.evaluate(function () {
    var $input = $('.webtrendsGB_amnt');
    $input.val('123');
  });
});

casper.thenClick('.webtrendsGB_bFirst');

casper.waitForSelectorTextChange('span.exchangeRate', function () {
  casper.evaluate(function () {
    console.log('[Moneygram] Result: GBP 1 = GHS', $('span.exchangeRate').text());
  });
});

casper.run();
