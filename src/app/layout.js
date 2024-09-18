import "./globals.scss";

export const metadata = {
  title: "Schedule App",
  description: "Create by P4N4SONIC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" as="manifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
