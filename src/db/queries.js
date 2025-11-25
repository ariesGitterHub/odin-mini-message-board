// ALL CODE THAT TALKS TO THE DATABASE GOES HERE, SO ALL SQL AND SEARCH

const pool = require("./pool");

// --- Get all users ---
async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM message_table ORDER BY id");
  return rows;
}

// // --- Get single user by id ---
// async function getMessage(id) {
//   const { rows } = await pool.query(
//     "SELECT * FROM user_list_table WHERE id = $1",
//     [id]
//   );
//   return rows[0]; // returns single user object or undefined
// }

// --- Add a new user ---
async function addMessage({ author, added, text, likes, liked_by }) {
  const query = `
    INSERT INTO message_table 
      (author, added, text, likes, liked_by)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [author, added, text, likes, liked_by];
  const { rows } = await pool.query(query, values);
  return rows[0]; // return the inserted user
}

// // --- Update a user by id ---
// async function updateMessage(id, { author, added, text, likes, liked_by }) {
//   const query = `
//     UPDATE user_list_table
//     SET author = $1,
//         added = $2,
//         text = $3,
//         likes = $4,
//         liked_by = $5,
//     RETURNING *;
//   `;
//   const values = [author, added, text, likes, liked_by];
//   const { rows } = await pool.query(query, values);
//   return rows[0]; // return the updated user
// }

// --- Delete a user by id ---
// async function deleteMessage(id) {
//   await pool.query("DELETE FROM message_table WHERE id = $1", [id]);
// }

// --- Search users by optional fields (see fields below) ---
//  THIS IS NEW CODE, and better than doing search in usersController.js, see that file for old search code

// --- Search users by only the fields provided ---
// async function searchMessages({ author, added, text, likes }) {
//   let query = `SELECT * FROM message_table`;
//   const values = [];
//   const conditions = [];

//   if (author) {
//     values.push(`%${author}%`);
//     conditions.push(`LOWER(author) LIKE LOWER($${values.length})`);
//   }

//   if (added) {
//     values.push(`%${added}%`);
//     conditions.push(`LOWER(added) LIKE LOWER($${values.length})`);
//   }

//   if (text) {
//     values.push(`%${text}%`);
//     conditions.push(`LOWER(text) LIKE LOWER($${values.length})`);
//   }

//   if (likes) {
//     values.push(`%${likes}%`);
//     conditions.push(`LOWER(likes) LIKE LOWER($${values.length})`);
//   }

//   if (conditions.length > 0) {
//     query += ` WHERE ` + conditions.join(" AND ");
//   }

//   query += " ORDER BY id";

//   const { rows } = await pool.query(query, values);
//   return rows;
// }

async function getMessageById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM message_table WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function updateLikes(id, likes, liked_by) {
  const { rows } = await pool.query(
    `
    UPDATE message_table
    SET likes = $1,
        liked_by = $2
    WHERE id = $3
    RETURNING *;
    `,
    [likes, liked_by, id]
  );
  return rows[0];
}

module.exports = {
  getMessages,
  //   getMessage,
  addMessage,
  //   updateMessage,
  // deleteMessage,
  //   searchMessages,
  getMessageById,
  updateLikes,
};
