const express = require("express");
const app = express();
const cron = require("node-cron");
const fs = require("fs").promises;
const axios = require("axios");
const puppeteer = require("puppeteer");

const dotenv = require("dotenv");
const scraper = require("./controllers/scraper");

dotenv.config();

const port = process.env.PORT || 5000;

async function readScrapedData() {
  try {
    const data = await fs.readFile("scraped-data.json", "utf8");
    const mdData = data.replace('"file', '"http://www.fsa.ac.ma/file');
    console.log(mdData);
    return JSON.parse(mdData);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

cron.schedule("30,59 * * * *", async () => {
  await scraper();
});

app.set("view engine", "ejs");

app.use(express.static("public"));

// app.get("/file*", async (req, res) => {
//   try {
//     const path = req.originalUrl;
//     const url = 'http://www.fsa.ac.ma' + path;
//     console.log(url);

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Set the viewport size to ensure the desired image size
//     // await page.setViewport({ width: 1280, height: 720 });

//     await page.goto(url);
//     const imageBuffer = await page.screenshot({ encoding: "binary" });

//     await browser.close();

//     res.setHeader("Content-Type", "image/png");
//     res.send(imageBuffer);
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     res.sendStatus(500);
//   }
// });

app.get("/", async (req, res) => {
  const scrapedData = await readScrapedData();
  res.render("index", { data: scrapedData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
