import { Link } from "react-router-dom";

import { useStateValue } from "../../store/reducer";

const Header = () => {
  const { state } = useStateValue();

  if (!state.username) {
    return (
      <header>
        <div className="btn-center">
          <Link to="/login" className="link">
            <button className="btn btn-dark btn-lg">Login</button>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="btn-center">
        <Link to="/myfiles" className="link">
          <button className="btn btn-dark btn-lg">My files</button>
        </Link>

        <Link to="/upload" className="link">
          <button className="btn btn-dark btn-lg">Upload</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
