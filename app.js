require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");  // To handle file paths

const app = express();

// const date = new Date();
// // const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
// const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
// const formattedDate = formatter.format(date);
// console.log(formattedDate); // Example output: "31-5-2023"

const date = new Date();

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York", // Ensures EDT/EST
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZoneName: "short",
});

const formattedDate = formatter.format(date).replace(",", " - ");

console.log(formattedDate);


  const messages = [
    {
      id: 0,
      user: "The Mad Muffin Man",
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

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  // const messages = [
  //   {
  //     text: "Hi there!",
  //     user: "Amando",
  //     added: new Date(),
  //   },
  //   {
  //     text: "Hello World!",
  //     user: "Charles",
  //     added: new Date(),
  //   },
  // ];

  res.render("index", { title: "Home", messages: messages });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/new", (req, res) => {
  res.render("new", { title: "New Message" });
});


// TODO - Investigate a better, proper way to code below
app.post("/", (req, res) => {
  // console.log(
  //   `user: ${req.body.user}, added: ${new Date()}, text: ${req.body.text}`
  // );
  messages.push({
    id: messages.length,
    user: req.body.user,
    added: formattedDate,
    text: req.body.text,
  });
  res.redirect("/");
  // .then((result) => {
  //   res.redirect("/")
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

})

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
