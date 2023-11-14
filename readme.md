# Web Scraping Project with Puppeteer and Node.js

## Overview

This project utilizes Node.js and Puppeteer for web scraping. Two types of scraping operations are implemented:

1. **Scrape All Quotes**
   - Scrapes all quotes (100) from multiple pages (10).
   - Returns a JSON object for each quote: <br>
   `{`<br>
    `"text": "The quote text goes here.",`<br>
    `"author": "Author Name",`<br>
    `"tagList": ["tag1", "tag2", "tag3"]`<br>
    `}`<br>

2. **Scrape Author Details**
   - Gathers links to all authors' about pages.
   - Scrapes details for each author, including name, date of birth (DOB), location, and description.
   - Returns a JSON object for each author: <br>
   `{`<br>
    `"name": "Author Name",`<br>
    `"DOB": "Date of Birth",`<br>
    `"location": "Author's Location",`<br>
    `"description": "Author's Description"`<br>
    `}`<br>

## Technology Used

- **Node.js:** A JavaScript runtime for executing server-side code.
- **Puppeteer:** A Node library that provides a high-level API to control headless browsers and provide browser automation.


- Scraped from : https://quotes.toscrape.com/