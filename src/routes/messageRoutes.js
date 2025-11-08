const express = require("express");
const router = express.Router();
const formatDate = require("../helpers/dateHelper");
const validateMessage = require("../middlewares/validateMessage");
const messages = require("../data/messages");

// Routes

// Main board page
router.get("/", (req, res) => {
  //   res.render("index", { title: "Main Board", messages: messages });
  // Reminder that I only need messages once if it is the same term...
  res.render("index", { title: "Main Board", messages });
});
// New posting page
router.get("/new", (req, res) => {
  res.render("new", { title: "New Posting" });
});

// Old create new posting
// router.post("/", (req, res) => {
//   messages.push({
//     id: messages.length,
//     user: req.body.user,
//     added: formatDate(new Date()),
//     text: req.body.text,
//   });
//   res.redirect("/");
// });

// Create new posting
// NOTE re: validateMessage - client-side validation can be bypassed easily, and if you only rely on the browser, your server could still receive invalid data - this is why server-side validation matters, see below
router.post("/", validateMessage, (req, res) => {
  const { user, text } = req.body;
  messages.push({
    id: messages.length,
    user,
    added: formatDate(new Date()),
    text,
    likes: 0,
  });
  res.redirect("/");
});

// Likes counter
router.post("/like/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((m) => m.id === id);

  if (message) {
    message.likes += 1; // Increment the count
  }

  res.redirect("/"); // Refresh the page!!!
});


// This can also be moved to app.js for a single global 404 view. Otherwise, it is fine here.
router.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = router;
