require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");  // To handle file paths

const app = express();

// Set the views directory (since views is inside the src folder)
// app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "src", "views"));

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}!`);
});

app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const information = [
    {
      title: "New Star Wars Movie?",
      snippet: "Not so veiled hints from a prominent director...",
    },
    {
      title: "Real Life Zombie!",
      snippet: "The first documented case of the undead...",
    },
    {
      title: "10 Odd Uses for Oatmeal",
      snippet: "Don't judge us, you need to know this...",
    },
  ];

  res.render("index", { title: "Home", information });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/new", (req, res) => {
  res.render("new", { title: "New Message" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
