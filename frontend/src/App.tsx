import { useEffect } from "react";

import "./App.css";
import useAuth from "./useAuth";
import Router from "./Router";
import Header from "./components/Header";
import { username } from "./store/username";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { getUser } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      getUser(token).then((user) => {
        if (user) {
          username.setUsername(user.email);
        } else {
          username.setUsername("");
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
});

export default App;
