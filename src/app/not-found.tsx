import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f8fafc",
          color: "#0f172a",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>404</h1>
          <p style={{ marginBottom: "1rem", color: "#64748b" }}>Page not found</p>
          <Link href="/en/" style={{ color: "#0f766e", fontWeight: 600 }}>
            Go to English home
          </Link>
        </div>
      </body>
    </html>
  );
}
