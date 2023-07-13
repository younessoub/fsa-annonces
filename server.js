const express = require("express");
const app = express();

const scraper = require("./controllers/scraper");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index", { data: await scraper() });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
