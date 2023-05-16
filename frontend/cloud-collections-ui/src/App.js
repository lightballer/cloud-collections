import { useCallback, useState } from "react";

import "./App.css";
// import MainPage from "./MainPage";
import MyFiles from "./MyFiles";
import Upload from "./Upload";

const routes = {
  // Main: <MainPage />,
  'My Files': <MyFiles/>,
  "Upload": <Upload/>
};

function App() {
  const [currentPage, setCurrentPage] = useState(null);

  const onNavItemClick = useCallback((event) => {
    const pageTitle = event.target.innerText;
    const page = routes[pageTitle];
    setCurrentPage(page);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            {/*<li>
               <button className="navButton" onClick={onNavItemClick}>
                Main
              </button>
            </li> */}
            <li>
              <button className="navButton" onClick={onNavItemClick}>
                My Files
              </button>
            </li>
            <li>
              <button className="navButton" onClick={onNavItemClick}>
                Upload
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <body>{currentPage}</body>
    </div>
  );
}

export default App;
