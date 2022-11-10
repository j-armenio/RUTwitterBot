const puppeteer = require("puppeteer");

async function getMenu(){
    console.log("Opening the browser...");
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://pra.ufpr.br/ru/ru-centro-politecnico/');

    // pega o "viewport" da página
    const breakfastMenu = await page.evaluate(() => {
        return {
            breakfastDay: document.querySelectorAll("tbody > tr:nth-child(2)").innerHTML,
        }
    })
    console.log(breakfastMenu);

    await browser.close();
}

getMenu();

module.exports = {
    getMenu
};