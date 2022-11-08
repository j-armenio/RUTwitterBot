const CronJob = require('cron').CronJob;
const famousQuotes = require('./famousQuotes');
const { postTweet } = require('./bot');

function getQuotes(){
    return famousQuotes.QUOTES[Math.floor[Math.random()*famousQuotes.QUOTES.lenght]];
}

new CronJob(
    '* * * * *',
    function(){
        postTweet(getQuotes());
    },
    null, true, 'Asia/Kolkata'
);