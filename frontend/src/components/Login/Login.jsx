import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import { useStateValue } from "../../store/reducer";
import { login } from "http/auth";
import useAuth from "useAuth";

const Login = () => {
  const { state, dispatch } = useStateValue();
  const { saveToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password).then((token) => {
      if (token) {
        const saveResult = saveToken(token);
        if (saveResult) dispatch({ type: "username", payload: email });
      }
    });
  };

  if (state.username) return <Navigate to={"/myfiles"} replace />;

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
                  Don't have an account? <Link to="/register">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
