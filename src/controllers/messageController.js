// THIS FILE IS FOR BUSINESS LOGIC AND RENDERING

const { body, validationResult, matchedData } = require("express-validator");

const {
  getMessages,
  // getMessage,
  addMessage,
  // updateMessage,
  // deleteMessage,
  // searchMessages,
  getMessageById,
  updateLikes,
} = require("../db/queries");

const formatDate = require("../helpers/dateHelper");

// Error messages
const authorLengthErr = "must be between 1 and 30 characters.";
const textLengthErr = "cannot exceed 200 characters.";

// Below, use .matches() only for character checking, keep .isLength() for length checking
const validateMessages = [
  body("author")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Username ${authorLengthErr}`),
  body("text")
    .trim()
    .isLength({ max: 200 })
    .withMessage(`Text ${textLengthErr}`),
];

exports.messagesListGet = async (req, res) => {
  const messages = await getMessages();
  // Format timestamp for message board display

  // REMINDER - Uses a spread operator to spread all the properties of the msg object into the new object.
  const formattedMessages = messages.map((msg) => ({
    ...msg,
    added: formatDate(msg.added),
  }));
  res.render("index", {
    title: "Main Board",
    messages: formattedMessages,
    sessionID: req.sessionID,
  });
};

exports.addMessageGet = (req, res) => {
  res.render("new", {
    title: "New Posting",
  });
};

exports.addMessagePost = [
  validateMessages,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", {
        title: "New Posting",
        errors: errors.array(),
      });
    }

    const data = matchedData(req);
    const { author, text } = data;

    await addMessage({
      author,
      added: new Date().toISOString(),
      text,
      likes: 0,
      liked_by: [],
    });

    res.redirect("/");
  },
];

exports.deleteMessagePost = async (req, res) => {
  await deleteMessage(req.params.id);
  res.redirect("/");
};

exports.toggleLikePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.sessionID; // unique per visitor

  const message = await getMessageById(id);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  // liked_by is a Postgres TEXT[] array
  const likedBy = message.liked_by || [];

  const hasLiked = likedBy.includes(userId);

  let newLikes;
  let newLikedBy;

  if (hasLiked) {
    newLikes = Math.max(message.likes - 1, 0);
    newLikedBy = likedBy.filter((u) => u !== userId);
  } else {
    newLikes = message.likes + 1;
    newLikedBy = [...likedBy, userId];
  }

  await updateLikes(id, newLikes, newLikedBy);

  res.redirect("/");
};
