var url = 'http://www.bog.gov.gh/data/bankindrate.php';

var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});
casper.on('remote.message', function (msg) {
  console.log(msg);
});

var bog = function () {
  casper.start(url);

  casper.thenEvaluate(function () {
    var buyGbp = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(3)').innerHTML);
    var sellGbp = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(4)').innerHTML);

    var buyEur = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(13) > td:nth-child(3)').innerHTML);
    var sellEur = parseFloat(document.querySelector('body > table > tbody > tr:nth-child(13) > td:nth-child(4)').innerHTML);

    console.log('GBP');
    console.log((buyGbp + sellGbp)/2);
    console.log('EUR');
    console.log((buyEur + sellEur)/2);
  });

  casper.run();
};

bog(3);
