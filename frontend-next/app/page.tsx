import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "./lib/context/context";
import useAuth from "./lib/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Home() {
  const { setUsername } = useContext(UserContext);
  const { getToken } = useAuth();


  const token = getToken();

  if (!token) {
    redirect('/login');
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container-fluid gray-bg" style={{ minHeight: "100vh" }}>
        {/* <Header /> */}
        <main>{/* <Router /> */}</main>
      </div>
    </main>
  );
}
