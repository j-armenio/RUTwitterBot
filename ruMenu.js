const puppeteer = require("puppeteer");

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
    
    return {
        breakfast: fullMenu.day + "\nCafé da Manhã:\n" + fullMenu.breakfastFood,
        lunch:     fullMenu.day + "\nAlmoço:\n" + fullMenu.lunchFood,
        dinner:    fullMenu.day + "\nJantar:\n" + fullMenu.dinnerFood
    };
};


module.exports = {  getMenu  };