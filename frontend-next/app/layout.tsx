import "./globals.css";
import { UserProvider } from "@/app/lib/context/context";
import { CustomSessionProvider } from "@/app/session-provider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
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
      </UserProvider>
    </html>
  );
}
