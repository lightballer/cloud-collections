import "./globals.css";
import { CustomSessionProvider } from "@/app/session-provider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <CustomSessionProvider>
          <body>
            <div
              className="container-fluid gray-bg"
              style={{ minHeight: "100vh" }}
            >
              {children}
            </div>
          </body>
        </CustomSessionProvider>
    </html>
  );
}
