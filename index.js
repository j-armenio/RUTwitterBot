const CronJob = require('cron').CronJob;
const { postTweet } = require('./bot');
const { getMenu } = require('./ruMenu');

new CronJob(
    '* * * * *',
    function(){
        postTweet(getMenu());
    },
    null,
    true,
    'America/Los_Angeles'
);