const puppeteer = require("puppeteer");

const getQuotes = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded"
    });

    const quotes = await page.evaluate(() => {
        const allQuotes = document.querySelectorAll(".quote");

        const quoteArr = Array.from(allQuotes);

        const quoteList = quoteArr.map((quote) => {
            const text = quote.querySelector(".text").innerText;
            const author = quote.querySelector(".author").innerText;

            return {text, author};
        });

        return quoteList;
    });

    console.log(quotes);

    await browser.close();
};

getQuotes();
