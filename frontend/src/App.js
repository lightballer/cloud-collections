import "./App.css";
import { useStateValue } from "./store/reducer";
import Router from "./Router";
import Header from "./components/Header";

function App() {
  const { state } = useStateValue();

  if (!state.username) {
    return (
      <div className="container-fluid gray-bg" style={{ minHeight: "100vh" }}>
        <Header />
        <main>
          <Router />
        </main>
      </div>
    );
  }

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
