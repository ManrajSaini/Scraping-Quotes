const puppeteer = require("puppeteer");

let data = [];
let linkSet = new Set();

const getAboutAuthor = async () => {

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

        const currPage = await page.url();

        const newLinks = await page.evaluate(async () => {
            const allQuotes = document.querySelectorAll(".quote");
            const quoteArr = Array.from(allQuotes);

            const links = []

            quoteArr.forEach((quote) => {
                let link = quote.querySelector(".author + a").href;

                if(!links.includes(link))
                    links.push(link);
            });
        
            return links;
        });

        newLinks.forEach((link) => {
            linkSet.add(link);
        });

        await page.goto(currPage);

        const nextPageBtn = await page.$(".pager > .next > a");

        if(nextPageBtn)
            await nextPageBtn.click();

        else
            hasNextPage = false;

        await new Promise(resolve => setTimeout(resolve, 2000));

    }

    let linkArr = Array.from(linkSet);    

    for(let i=0; i<linkArr.length; i++){
        await page.goto(linkArr[i]);

        const details = await page.evaluate(async () => {
            
            const authorDetails = document.querySelector(".author-details");

            const name = authorDetails.querySelector(".author-title").innerText;
            const dob = authorDetails.querySelector(".author-born-date").innerText;
            const location = authorDetails.querySelector(".author-born-location").innerText;
            let desc = authorDetails.querySelector(".author-description").innerText;

            const lines = desc.split('.').slice(0, 3);
            const extractedText = lines.join('.') + '.';
            desc = extractedText;

            const author = {
                Name : name,
                DOB: dob,
                Location: location,
                Description: desc
            }

            return author;
        });

        data.push(details);
    }

    await browser.close();
    console.log(data)

};


module.exports = getAboutAuthor;