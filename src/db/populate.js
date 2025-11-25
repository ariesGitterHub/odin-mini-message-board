require("dotenv").config();

const { Client } = require("pg");

const messages = [
  [
    "The Mad Muffin Man",
    "2025-11-01T13:37:47-05:00",
    "Hi neighbors! Welcome to our local message board. The use of foul language is encouraged and appreciated.",
    2,
    [], // liked_by
  ],
  [
    "James Paul",
    "2025-11-04T08:12:01-05:00",
    "Speaking of swearing a lot, don't forget to vote today.🎃",
    2,
    [],
  ],
  [
    "Montague The Dog 🐶",
    "2025-11-04T12:11:36-05:00",
    "Roses are red, violets are blue, I'm hungry for snackies, why aren't you? 🍗🥓🧀🍕🍖",
    3,
    [],
  ],
  [
    "Odd-fact Jack",
    "2025-11-04T17:45:54-05:00",
    "The longest place name in the English-speaking world is Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu in New Zealand, which has 85 letters.",
    0,
    [],
  ],
];

async function main() {
  console.log("Seeding...");

  const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
  });

  await client.connect();

  // Create table if not exists
  await client.query(`
    CREATE TABLE IF NOT EXISTS message_table (
      id SERIAL PRIMARY KEY,
      author VARCHAR(255),
      added TIMESTAMPTZ DEFAULT now(),
      text TEXT,
      likes INTEGER DEFAULT 0,  
      liked_by TEXT[] DEFAULT '{}'    
    );
  `);

  // Insert data one by one (safe and idempotent)
  for (const [author, added, text, likes, liked_by] of messages) {
    await client.query(
      `
      INSERT INTO message_table (author, added, text, likes, liked_by)
      VALUES ($1, $2, $3, $4, $5);
      `,
      [author, added, text, likes, liked_by]
    );
  }

  await client.end();
  console.log("Seeding complete!");
}

main().catch((err) => console.error("Error seeding DB:", err));
