import pg from "pg";

export async function POST(req) {
  const { id, comment } = await req.json();
  if (!id || !comment) {
    return new Response(JSON.stringify({ error: "Missing id or comment" }), {
      status: 400,
    });
  }

  const db = new pg.Pool({
    connectionString: process.env.DB_CONN,
    ssl: { rejectUnauthorized: false },
  });

  // Create a single comments table if it doesn't exist, with a foreign key to game_reviews
  await db.query(`CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES game_reviews(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert the comment with the post_id foreign key
  await db.query(`INSERT INTO comments (post_id, comment) VALUES ($1, $2)`, [
    id,
    comment,
  ]);

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
