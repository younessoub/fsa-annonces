const puppeteer = require('puppeteer')
const fs = require('fs');




const scrapeWebsite = async ()=>{
    const url = 'http://www.fsa.ac.ma'

    async function run() {
        // Launch the browser
        const browser = await puppeteer.launch();
      
        // Create a page
        const page = await browser.newPage();
      
        // Go to your site
        await page.goto(url);
      
        // Query for an element handle.
        const titles = await page.evaluate(()=>Array.from(document.querySelectorAll('#centerBoxes div .titre'), (e)=> e.innerText))
        
        const contents = await page.evaluate(()=>Array.from(document.querySelectorAll('#centerBoxes div .tbl'), (e)=> e.innerHTML))
      
      
        await browser.close();
        
        return [titles, contents];
    }

    const data = await run()
    // Assuming you have scrapedData as an object/array representing the scraped data
    const dataJson = JSON.stringify(data);

    // Save the data to a file
    fs.writeFileSync('scraped-data.json', dataJson);
    return data;

}



module.exports = scrapeWebsite
