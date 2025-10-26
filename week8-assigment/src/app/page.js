import Link from "next/link";
import pg from "pg";

export default async function Home() {
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  // Fetch reviews from database
  const result = await db.query("SELECT * FROM game_reviews");
  const reviews = result.rows;

  return (
    <div>
      <h1>Game Reviews ({reviews.length} total)</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {reviews.map((review) => (
          <Link
            key={review.id}
            href={`/post/${review.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "2rem",
                width: "340px",
                minHeight: "340px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                background: "#fafbfc",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
            >
              <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
                {review.game_title || review.review || `Review ${review.id}`}
              </h3>
              {review.image_url && (
                <img
                  src={review.image_url}
                  alt={review.image_alt || "Game image"}
                  width="300"
                  height="200"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
