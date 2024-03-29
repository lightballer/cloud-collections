import { Link } from "react-router-dom";

import { username } from "store/username";
import { observer } from "mobx-react-lite";

import useAuth from "useAuth";

const Header = observer(() => {
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    const logoutResult = logout();
    if (logoutResult) username.setUsername("");
  };

  if (!username.username) {
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

        <div className="link">
          <button className="btn btn-dark btn-lg text-danger" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
