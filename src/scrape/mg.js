var GBP = {
  url: 'https://www.moneygram.com/wps/portal/moneygramonline/home/sendmoney?CC=GB&LC=en-GB&cp=set'
};

var EUR = {
  url: 'https://www.moneygram.com/MGODE/flows/home'
};

var extractedRate;

var fs = require('fs');

// Main
var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
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
casper.waitForSelectorTextChange('span.exchangeRate', function () {
  extractedRate = casper.evaluate(function () {
     return $('span.exchangeRate').text();
  });
});
casper.then(function () {
  console.log('GBP (UK)', extractedRate);
  fs.write('global/MG_GBP', extractedRate, 'w');
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
casper.waitForText("1 EUR", function() {
  extractedRate = casper.evaluate(function () {
    var rate = $('p.exRate').text().match(/\d+,\d+/)[0];
    return rate.replace(',', '.');
  });
});
casper.then(function () {
  console.log('EUR (DE)', extractedRate);
  fs.write('global/MG_EUR', extractedRate, 'w');
});


casper.run();
