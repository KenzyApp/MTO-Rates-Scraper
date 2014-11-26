var url = 'http://www.bog.gov.gh/data/bankindrate.php';

var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});
casper.on('remote.message', function (msg) {
  console.log(msg);
});

casper.start(url);

casper.thenEvaluate(function () {
  var buy = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(3)').innerHTML);
  var sell = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(4)').innerHTML);

  // console.log('Buy: ' + buy);
  // console.log('Sell: ' + sell);
  console.log('[Bank of Ghana] Result: GBP 1 = GHS', (buy + sell)/2);
});

casper.run();
