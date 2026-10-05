import Link from "next/link";

/**
 * Static root redirect for `output: 'export'` (middleware is incompatible
 * with static export). Meta refresh + visible link — no IP-based detection.
 */
export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="/en/" />
        <title>Meridian Partners</title>
      </head>
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
        <p>
          Redirecting to{" "}
          <Link href="/en/" style={{ color: "#0f766e", fontWeight: 600 }}>
            English
          </Link>
          …
        </p>
      </body>
    </html>
  );
}
