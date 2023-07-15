const express = require("express");
const app = express();
const cron = require("node-cron");
const fs = require("fs").promises;
const axios = require("axios");

const dotenv = require("dotenv");
const scraper = require("./controllers/scraper");

dotenv.config();

const port = process.env.PORT || 5000;

async function readScrapedData() {
  try {
    const data = await fs.readFile("scraped-data.json", "utf8");
    return JSON.parse(data);
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

app.get("/file*", async (req, res) => {

  try {
    const path = req.originalUrl;
    const url = 'http://www.fsa.ac.ma'+ path;
    const { data, headers } = await axios.get(url, {
      responseType: "arraybuffer",
    });

    res.set("Content-Type", headers["content-type"]);
    res.send(data);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.sendStatus(500);
  }
});

app.get("/", async (req, res) => {
  const scrapedData = await readScrapedData();
  res.render("index", { data: scrapedData });
});

app.get("/file", async (req, res) => {
  const imageUrl = req.query.url;
  console.log(imageUrl);
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    const contentType = response.headers.get("content-type");

    res.set("Content-Type", contentType);
    res.send(buffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
