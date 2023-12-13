import "bootstrap/dist/css/bootstrap.css";
import Navbar from "@/app/ui/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </main>
    </>
  );
}
