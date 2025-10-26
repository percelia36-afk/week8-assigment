"use client";
import React, { useState } from "react";

export default function CommentForm({ reviewId }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment) return;
    setLoading(true);
    const res = await fetch(`/post/${reviewId}/api/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: reviewId, comment }),
    });
    setLoading(false);
    if (res.ok) {
      setComment("");
      // Refresh the page to show the new comment
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } else {
      alert("Failed to submit comment");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <label htmlFor="comment">
        <strong>Leave a comment:</strong>
      </label>
      <br />
      <textarea
        id="comment"
        name="comment"
        rows={3}
        style={{ width: "100%", marginTop: 8 }}
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <button
        type="button"
        style={{ marginTop: 8 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
