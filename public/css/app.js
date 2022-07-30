const e = require("express");
const express = require("express");
const app = express();

//Parse in the JSON file data
const fs = require("fs");
const { nextTick } = require("process");
let rawdata = fs.readFileSync("data/data.json");
let { projects } = JSON.parse(rawdata);

//Set view engine to pug
app.set("view engine", "pug");

//Serve public folder to /static
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res, next) => {
  const { id } = req.params;

  if (projects[id - 1]) {
    res.render("project", { project: projects[id - 1] });
  } else {
    const err = new Error(`Project ${id} doesn't exist.`);
    err.status = 404;
    res.status(404);
    console.log(err.message);
    return res.render("page-not-found");
  }
});

app.use((req,res) => {
    res.status(404).render("page-not-found");
});

app.listen(3000, () => {
  console.log("Site is running on localhost:3000");
});