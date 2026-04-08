// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "My Changelog",
  description: "Personal dev log",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}