import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function AppShell({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <Link to="/dashboard">TaskOff</Link>
        </div>
        <div className="app-shell__nav">
          <span className="app-shell__user">
            {user?.fullName || user?.email || "User"}
          </span>
          <button className="app-shell__logout" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      <main className="app-shell__main">{children}</main>
    </div>
  );
}

export default AppShell;
