import Navbar from "@/app/ui/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-primary">
        <div className="flex-grow md:overflow-y-auto md:p-12">
          {children}
        </div>
      </main>
    </>
  );
}
