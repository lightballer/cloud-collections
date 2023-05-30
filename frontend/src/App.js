import { useEffect } from "react";

import "./App.css";
import useAuth from "./useAuth";
import Router from "./Router";
import Header from "./components/Header";
import { useStateValue } from "./store/reducer";

function App() {
  const username = useAuth();
  const { dispatch } = useStateValue();

  useEffect(() => {
    if (username) dispatch({ type: "username", payload: username });
  }, [dispatch, username]);

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
