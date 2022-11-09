const CronJob = require('cron').CronJob;
const { postTweet } = require('./bot');

new CronJob(
    '* * * * *',
    function(){
        postTweet("banana222");
    },
    null,
    true,
    'America/Los_Angeles'
);