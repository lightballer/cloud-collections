"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import useCheckAuthentication from "@/app/lib/hooks/useCheckAuthentication";

export default function Page() {
  const { isLoading } = useCheckAuthentication("/files");

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

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
              <form action={dispatch}>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      required
                    />
                  </div>
                  {errorMessage && (
                    <div className="help-block text-danger">{errorMessage}</div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Login
                  </button>
                </div>
              </form>
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
