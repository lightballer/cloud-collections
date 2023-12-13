"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const handleLogoutClick = async () => await signOut();

  return (
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
  );
};

export default Navbar;
