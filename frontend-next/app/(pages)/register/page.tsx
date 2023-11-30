"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import { signUp } from "@/app/lib/http/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserContext } from "@/app/lib/context/context";

export default function Page() {
  const { username } = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const passwordsMatch = useMemo(
    () => password === repeatedPassword,
    [password, repeatedPassword]
  );

  useEffect(() => {
    if (password !== repeatedPassword)
      setErrorMessage("Passwords are not matching");
    else setErrorMessage("");
  }, [password, passwordsMatch, repeatedPassword]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatedPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordsMatch) {
      signUp(email, password).then((user) => {
        if (user) {
          redirect("/login");
        } else {
          setErrorMessage("User with such email already exists");
        }
      });
    }
  };

  if (username) redirect("/files");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Sign up</h3>
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
                <div className="row mb-3">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    Repeat password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="repeated-password"
                      value={repeatedPassword}
                      onChange={handleRepeatedPasswordChange}
                      required
                    />
                  </div>
                  {(!passwordsMatch || errorMessage) && (
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
