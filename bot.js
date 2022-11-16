require('dotenv').config();
const Twit = require('twit');
const CronJob = require('cron').CronJob;
const puppeteer = require("puppeteer");
const client = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

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

// Função que pega os dados do html e posta os tweets
async function getMenu() {
    console.log("Opening the browser...");
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://pra.ufpr.br/ru/ru-centro-politecnico/', {waitUntil: 'domcontentloaded'});
    console.log("Content loaded...");

    // Pega o "viewport" da página
    const fullMenu = await page.evaluate(() => {
        return {
            day: document.querySelector('#conteudo div:nth-child(3) p strong').innerText,
            breakfastFood: document.querySelector('tbody tr:nth-child(2)').innerText,
            lunchFood: document.querySelector('tbody tr:nth-child(4)').innerText,
            dinnerFood: document.querySelector('tbody tr:nth-child(6)').innerText
        };
    });

    await browser.close();
    
    const menu = {
        breakfast: fullMenu.day + "\nCafé da Manhã:\n" + fullMenu.breakfastFood,
        lunch:     fullMenu.day + "\nAlmoço:\n" + fullMenu.lunchFood,
        dinner:    fullMenu.day + "\nJantar:\n" + fullMenu.dinnerFood
    };

    postTweet(menu.breakfast);
    postTweet(menu.lunch);
    postTweet(menu.dinner);

};

// Função que define a hora e o dia de postar o tweet
new CronJob(
    '0 7 * * mon, tue, wed, thu, fri',
    getMenu(),
    null,
    true,
    'America/Sao_Paulo'
); 

