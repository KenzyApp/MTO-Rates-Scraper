var url = 'http://www.bog.gov.gh/data/bankindrate.php';

var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});

var data = {};

var fs = require('fs');

casper.start(url);

casper.then(function () {
  data = casper.evaluate(function () {
    var buyGbp = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(3)').innerHTML);
    var sellGbp = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(4)').innerHTML);

    var buyEur = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(13) > td:nth-child(3)').innerHTML);
    var sellEur = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(13) > td:nth-child(4)').innerHTML);

    return {
      gbp: (buyGbp + sellGbp)/2,
      eur: (buyEur + sellEur)/2
    };
  });
});

casper.then(function () {
  console.log('GBP', data.gbp);
  console.log('EUR', data.eur);

  fs.write('global/BOG_GBP', data.gbp, 'w');
  fs.write('global/BOG_EUR', data.eur, 'w');
});


casper.run();
