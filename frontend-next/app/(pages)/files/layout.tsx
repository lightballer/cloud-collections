"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { signOut } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <>
      <header>
        <div className="btn-center">
          <Link href="/files" className="link">
            <button className="btn btn-dark btn-lg">My files</button>
          </Link>

          <Link href="/files/upload" className="link">
            <button className="btn btn-dark btn-lg">Upload</button>
          </Link>

          <div className="link">
            <button
              className="btn btn-dark btn-lg text-danger"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </main>
    </>
  );
}
