"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const handleLogoutClick = async () => await signOut();

  return (
    <div className="flex justify-around h-20 pt-3 bg-slate-400">
      <Link href="/files" className="link">
        <button className="nav-bar-item">My files</button>
      </Link>

      <Link href="/files/upload" className="link">
        <button className="nav-bar-item">Upload</button>
      </Link>

      <div className="link">
        <button
          className="nav-bar-item !text-red-500"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
