require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");  // To handle file paths

const app = express();

  const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date(),
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date(),
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

app.post("/", (req, res) => {
  console.log(
    `user: ${req.body.user}, added: ${new Date()}, text: ${req.body.text}`
  );
  messages.push({user: req.body.user, added: new Date(), text: req.body.text });
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
