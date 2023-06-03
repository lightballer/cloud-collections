import React, { useEffect } from "react";

import "./App.css";
import useAuth from "./useAuth";
import Router from "./Router";
import Header from "./components/Header";
import { useStateValue } from "./store/reducer";

function App() {
  const { getUser } = useAuth();
  const { dispatch } = useStateValue();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      getUser(token).then((user) => {
        if (user) {
          dispatch({ type: "username", payload: user.username });
        } else {
          dispatch({ type: "username", payload: "" });
        }
      });
    }
  }, []);

  return (
    <div className="container-fluid gray-bg" style={{ minHeight: "100vh" }}>
      <Header />
      <main>
        <Router />
      </main>
    </div>
  );
}

export default App;
