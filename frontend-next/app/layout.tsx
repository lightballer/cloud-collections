import "./globals.css";
import { CustomSessionProvider } from "@/app/session-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Cloud Collections</title>
      </head>
      <CustomSessionProvider>
        <body className="overflow-x-hidden">
          <div style={{ minHeight: "100vh" }}>{children}</div>
        </body>
      </CustomSessionProvider>
    </html>
  );
}
