const puppeteer = require('puppeteer')

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
    return data;

}



module.exports = scrapeWebsite
