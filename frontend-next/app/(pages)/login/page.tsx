"use client";

import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { redirect } from "next/navigation";

// import { username } from "store/username";
import { login } from "@/app/lib/http/auth";
import Link from "next/link";
import useAuth from "@/app/lib/hooks/useAuth";
import { UserContext } from "@/app/lib/context/context";

export default function Page() {
  const { username, setUsername } = useContext(UserContext);
  const { saveToken } = useAuth();

  if (username) redirect('/files');

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password).then((token) => {
      if (token) {
        const saveResult = saveToken(token);
        if (saveResult) setUsername(email);
      }
    });
  };

  // if (username.username) replace("/files");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
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
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center">
                <p>
                  Don&apos;t have an account? <Link href="/register">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
