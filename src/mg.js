var GBP = {
  url: 'https://www.moneygram.com/wps/portal/moneygramonline/home/sendmoney?CC=GB&LC=en-GB&cp=set'
};

var EUR = {
  url: 'https://www.moneygram.com/MGODE/flows/home'
};


// Main
var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});

casper.on('remote.message', function (msg) {
  if (msg.indexOf('1 =') > -1) {
    console.log(msg);
  }
});

// UK to GH
casper.start(GBP.url);
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
casper.then(function () {
  console.log('GBP (UK)');
});
casper.waitForSelectorTextChange('span.exchangeRate', function () {
  casper.evaluate(function () {
    console.log($('span.exchangeRate').text());
  });
});

// DE to GH
casper.thenOpen(EUR.url);
casper.thenEvaluate(function () {
  var $select = $('#country_sel');
  var _option = 'GHA';
  $select.val(_option);
  $select.change();
});
casper.waitForText("GHS", function() {
  casper.evaluate(function () {
    var $input = $('#amount_textbox');
    $input.val('100');
  });
});
casper.thenClick('#j_idt149');
casper.then(function () {
  console.log('EUR (DE)');
});
casper.waitForText("1 EUR", function() {
  casper.evaluate(function () {
    var rate = $('p.exRate').text().match(/\d+,\d+/)[0];
    console.log(rate.replace(',', '.'));
  });
});


casper.run();
