var Bot = require('./bot');
var config = require('./config');
var bot = new Bot(config);

var getMarkups = require('../analytics/analytics');
var markups = getMarkups();

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}

var textUK = 'UK to Ghana hidden exchange rate markups - ' +
             'Western Union: ' + markups.GBP.WU + '% ' +
             'Moneygram: ' + markups.GBP.MG + '% ' +
             '#stophiddenfees';

var textDE = 'Germany to Ghana hidden exchange rate markups - ' +
             'Western Union: ' + markups.EUR.WU + '% ' +
             'Moneygram: ' + markups.EUR.MG + '% ' +
             '#stophiddenfees';

bot.tweet(textUK, function (err, reply) {
  if(err) return handleError(err);
  console.log('Tweet: ' + (reply ? reply.text : reply));
});

bot.tweet(textDE, function (err, reply) {
  if(err) return handleError(err);
  console.log('Tweet: ' + (reply ? reply.text : reply));
});
