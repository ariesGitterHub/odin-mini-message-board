require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

const path = require("path"); // To handle file paths

const PORT = process.env.PORT || 3000;

const messageRoutes = require("./src/routes/messageRoutes");
const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);


// View Engine
// Set the views directory (since views is inside the src folder)
// app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use("/", messageRoutes);
// Server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}!`);
});
