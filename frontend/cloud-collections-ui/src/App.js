import { useCallback, useState } from "react";

import "./App.css";
// import MainPage from "./MainPage";
import MyFiles from "./MyFiles";
import Upload from "./Upload";

const routes = {
  // Main: <MainPage />,
  "My Files": <MyFiles />,
  Upload: <Upload />,
};

function App() {
  const [currentPage, setCurrentPage] = useState(routes["My Files"]);

  const onNavItemClick = useCallback((event) => {
    const pageTitle = event.target.innerText;
    const page = routes[pageTitle];
    setCurrentPage(page);
  }, []);

  return (
    <div className="container-fluid gray-bg" style={{ minHeight: "100vh" }}>
      <header>
        <div className="btn-center">
          <div>
            <button className="btn btn-dark btn-lg" onClick={onNavItemClick}>
              My Files
            </button>
          </div>
          <div>
            <button className="btn btn-dark btn-lg" onClick={onNavItemClick}>
              Upload
            </button>
          </div>
        </div>
      </header>
      <main>{currentPage}</main>
    </div>
  );
}

export default App;
