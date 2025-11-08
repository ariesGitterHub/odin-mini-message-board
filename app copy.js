require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { formatDate } = require("./src/helpers/dateHelper");

const path = require("path");  // To handle file paths

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// View Engine
// Set the views directory (since views is inside the src folder)
// app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Sample Data Array
  const messages = [
    {
      id: 0,
      user: "Mad Muffin Man",
      added: "Sat - Nov 01, 2025, 1:37:47 PM EST",
      text: "Hi neighbors! Welcome to our neighborhood message board. The use of foul language is encouraged.",
    },
    {
      id: 1,
      user: "Amanda Comanda",
      added: "Mon - Nov 03, 2025, 3:41:11 PM EST",
      text: "FUN!!! 😀",
    },
    {
      id: 2,
      user: "Jamie",
      added: "Tue - Nov 04, 2025, 8:12:01 AM EST",
      text: "Don't forget to vote today...🎃",
    },
    {
      id: 3,
      user: "Montague Earl",
      added: "Tue - Nov 04, 2025, 12:11:36 PM EST",
      text: "Roses are red, violets are blue, I'm hungry for snackies, why aren't you? 🐶🍖",
    },
    {
      id: 4,
      user: "Odd-fact Jack",
      added: "Tue - Nov 04, 2025, 5:45:54 PM EST",
      text: "The longest place name in the English-speaking world is Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu in New Zealand, which has 85 letters.",
    },
  ];

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Main Board", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("new", { title: "New Posting" });
});

app.post("/", (req, res) => {
  messages.push({
    id: messages.length,
    user: req.body.user,
    added: formatDate(new Date()),
    text: req.body.text,
  });
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// Server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}!`);
});
