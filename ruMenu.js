const puppeteer = require("puppeteer");

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true,})
    const page = await browser.newPage();
    await  page.goto("https://pra.ufpr.br/ru/ru-centro-politecnico/", {
        waitUntil: "networkidle2",
    });

    await page.waitForSelector("tbody");
    await page.waitForSelector("p > strong");

    
}