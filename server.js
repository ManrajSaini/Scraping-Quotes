const getAllQuotes = require("./getAllQuotes");

const condition = process.argv[2];

const chooseScraper = async (condition) => {
    switch(condition){
        case "1":
            await getAllQuotes();
            break;

        case "2":
            await getAboutAuthor();
            break;

        default:
            console.log("Invalid option given");
    }
};

chooseScraper(condition);