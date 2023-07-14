const express = require("express");
const app = express();

require('dotenv').config()

const scraper = require("./controllers/scraper");

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index", { data: await scraper() });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
