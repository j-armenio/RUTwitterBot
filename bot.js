require('dotenv').config();
const Twit = require('twit');

// Inicializa Twit client
const client = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// Função de postar Tweet
const postTweet = (message) => {
    return new Promise((resolve, reject) => {
        client.post("statuses/update", {
            status: message
        }, (error, data, response) =>{
            if (error){
                console.log(error);
                reject(error);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
};

module.exports = { postTweet }; 