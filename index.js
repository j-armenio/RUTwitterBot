require('dotenv').config();
const Twit = require('twit');
const client = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})
const CronJob = require('cron').CronJob;
const { getMenu } = require('./ruMenu');


// Função para postar o tweet
const postTweet = (message) => {
    console.log('iniciando postTweet...');
    return new Promise((resolve, reject) => {
        client.post("statuses/update", {
            status: message
        }, (error, data, response) => {
            if (error) {
                console.log("Deu erro! ");
                console.log(error);
                reject(error);
            } else {
                console.log("Dados do post: ");
                console.log(data);
                resolve(data);
            }
        });
    });
};

(async () => {
    let menu = await getMenu();
    // Função que define a hora e o dia de postar o tweet
    new CronJob(
        '0 7 * * mon, tue, wed, thu, fri, sat',
        function(){
            postTweet(menu.breakfast);
            postTweet(menu.lunch);
            postTweet(menu.dinner);
        },
        null,
        true,
        'America/Sao_Paulo'
    ); 
 })();