const puppeteer = require("puppeteer");

let data = [];

const getAllQuotes = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded"
    });

    let hasNextPage = true;

    while(hasNextPage){
        const quotes = await page.evaluate(() => {
            const allQuotes = document.querySelectorAll(".quote");

            const quoteArr = Array.from(allQuotes);

            const quoteList = quoteArr.map((quote) => {
                const text = quote.querySelector(".text").innerText;
                const author = quote.querySelector(".author").innerText;

                const allTags = quote.querySelectorAll(".tags > .tag");
                const tagArr = Array.from(allTags);

                const tagList = tagArr.map((singleTag) => {
                    const genre = singleTag.innerText;

                    return genre;
                });

                return {text, author, tagList};
            });

            return quoteList;
        });

        data = data.concat(quotes)

        const nextPageBtn = await page.$(".pager > .next > a");

        if(nextPageBtn)
            await nextPageBtn.click();

        else
            hasNextPage = false;

        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(data);
    
    await browser.close();
};

module.exports = getAllQuotes;