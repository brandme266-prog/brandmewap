"use client";

export default function HelloPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#FBFBF9",
      fontFamily: "'Almarai', sans-serif",
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "#4A9A10", margin: 0 }}>
          Hello World
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#5E665E", marginTop: "1rem" }}>
          Site is live and working.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <a href="/" style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            background: "#0C0F0C",
            color: "#fff",
            borderRadius: "999px",
            fontWeight: 600,
            textDecoration: "none",
          }}>
            Go to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
