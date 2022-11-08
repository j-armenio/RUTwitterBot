require("dotenv").config();
const twit = require('./twit');
let schedule = require('node-schedule');

function pegaCardapio()
{
    setTimeout(10);
}

function postTweet()
{
    return new Promise((resolve, reject) => {
        let params = {
            id,
        }
        twit.post("statuses/:id", params, (err, data) => {
            if (err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

async function main()
{
    try {
        const data = await pegaCardapio();
        
    } catch(e){
        console.error(e);
    }
}

console.log('Começando o bot...');

setInterval(main, 10000);