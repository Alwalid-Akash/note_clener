import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">
          <i className="bi bi-journal-text"></i>
          Notes App
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Menu */}
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            {user ? (
              // ✅ Logged-in user
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    <i className="bi bi-person-circle"></i>
                    {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // ❌ Guest (not logged in)
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;