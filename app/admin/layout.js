export const metadata = {
  title: "Admin — Krech.Co",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="/admin.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
