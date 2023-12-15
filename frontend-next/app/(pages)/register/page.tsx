"use client";

// import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Link from "next/link";
import useCheckAuthentication from "@/app/lib/hooks/useCheckAuthentication";
import RegisterForm from "@/app/ui/register/RegisterForm";

export default function Page() {
  const { isLoading } = useCheckAuthentication("/files");

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Sign up</h3>
            </div>
            <div className="card-body">
              <RegisterForm />
            </div>
            <div className="text-center">
              <p>
                Already have an account? <Link href="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
