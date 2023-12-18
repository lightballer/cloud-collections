"use client";

import React from "react";
import Link from "next/link";
import useCheckAuthentication from "@/app/lib/hooks/useCheckAuthentication";
import RegisterForm from "@/app/ui/register/RegisterForm";
import Spinner from "@/app/ui/Spinner";

export default function Page() {
  const { isLoading } = useCheckAuthentication("/files");

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="border-2 p-10 rounded-md">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-2xl">Sign up</h3>
          <RegisterForm />
          <p className="mt-4">
            {`Already have an account? `}
            <Link href="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
