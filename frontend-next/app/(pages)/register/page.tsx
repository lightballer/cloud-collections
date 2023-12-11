"use client";

import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Link from "next/link";
import { register } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import useCheckAuthentication from "@/app/lib/hooks/useCheckAuthentication";

export default function Page() {
  const { isLoading } = useCheckAuthentication("/files");

  const [errorMessage, dispatch] = useFormState(register, undefined);

  const { pending } = useFormStatus();

  if (pending) {
    return <div>Loading...</div>;
  }

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
                </div>
                <div className="row mb-3">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    Repeat password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      name="password_repeated"
                      className="form-control"
                      id="repeated-password"
                      required
                    />
                  </div>
                  {errorMessage && (
                    <div className="help-block text-danger">{errorMessage}</div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Sign up
                  </button>
                </div>
              </form>
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
