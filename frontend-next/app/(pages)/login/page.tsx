"use client";

import React from "react";
import Link from "next/link";
import useCheckAuthentication from "@/app/lib/hooks/useCheckAuthentication";
import LoginForm from "@/app/ui/login/LoginForm";
import Spinner from "@/app/ui/Spinner";

export default function Page() {
  const { isLoading } = useCheckAuthentication("/files");

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="border-2 p-10 rounded-md">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-2xl">Login</h3>
          <LoginForm />
          <p className="mt-4">
            {`Don't have an account? `}
            <Link href="/register" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
