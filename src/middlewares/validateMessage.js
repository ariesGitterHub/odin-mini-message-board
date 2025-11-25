// NOTE - The code below is no longer being used as a PostgreSQL db has been added.

// function validateMessage(req, res, next) {
//   const { user, text } = req.body;
//   if (!user || !text.trim()) {
//     return res.status(400).render("new", {
//       title: "New Posting",
//       error: "User and message text are required.",
//       user,
//       text,
//     });
//   }
//   next(); // Proceeds to the route handler
// }

// module.exports = validateMessage;
