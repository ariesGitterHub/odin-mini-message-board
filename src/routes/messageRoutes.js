const { Router } = require("express");
const messageController = require("../controllers/messageController");

const messageRouter = Router();

// Main board page
messageRouter.get("/", messageController.messagesListGet);

// New posting (create message)
messageRouter.get("/new", messageController.addMessageGet);
messageRouter.post("/new", messageController.addMessagePost);

// Delete message
messageRouter.post("/:id/delete", messageController.deleteMessagePost);

// // Like / Unlike message
messageRouter.post("/like/:id", messageController.toggleLikePost);

// 404 fallback
messageRouter.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = messageRouter;
