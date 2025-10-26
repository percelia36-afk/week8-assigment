import pg from "pg";
import ClientCommentForm from "./form/ClientCommentForm";

export default async function PostPage({ params }) {
  // Await params if it's a Promise (Next.js app dir dynamic routes)
  const resolvedParams =
    typeof params.then === "function" ? await params : params;

  const db = new pg.Pool({
    connectionString: process.env.DB_CONN,
    ssl: { rejectUnauthorized: false },
  });
  // Fetch the review
  const result = await db.query("SELECT * FROM game_reviews WHERE id = $1", [
    resolvedParams.id,
  ]);
  const review = result.rows[0];
  if (!review) {
    return <div>Post not found</div>;
  }

  // Fetch comments for this post
  let comments = [];
  try {
    const commentsResult = await db.query(
      "SELECT comment, created_at FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
      [review.id]
    );
    comments = commentsResult.rows;
  } catch (e) {
    // If comments table doesn't exist or error, just show none
    comments = [];
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: 8,
        background: "#fafbfc",
      }}
    >
      <h1>{review.game_title || review.title}</h1>
      {review.image_url && (
        <img
          src={review.image_url}
          alt={review.image_alt || "Game image"}
          width="400"
          height="250"
          style={{ objectFit: "cover", borderRadius: "4px" }}
        />
      )}
      <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
        <p>
          <strong>Game Title:</strong> {review.game_title}
        </p>
        <p>
          <strong>Rating:</strong> {review.rating}
        </p>
        <p>
          <strong>Review:</strong> {review.review}
        </p>
      </div>

      {/* Comments Section */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {comments.map((c, i) => (
              <li
                key={i}
                style={{
                  marginBottom: "1rem",
                  borderBottom: "1px solid #eee",
                  paddingBottom: 8,
                }}
              >
                <div style={{ fontSize: 14, color: "#333" }}>{c.comment}</div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {new Date(c.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Comment Form (client-only) */}
      <ClientCommentForm reviewId={review.id} />
    </div>
  );
}
