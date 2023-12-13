"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import useCheckAuthentication from "@/app/lib/hooks/useCheckAuthentication";
import LoginForm from "@/app/ui/login/LoginForm";

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
              <h3 className="card-title">Login</h3>
            </div>
            <div className="card-body">
              <LoginForm />
              <div className="text-center">
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
