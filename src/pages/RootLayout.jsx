import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { logout } from "../utils/auth"; 
import { useQuote } from "../context/useQuote";

function RootLayout() {
  const { resetQuote } = useQuote();
  const location = useLocation();
  const isSignInPage = location.pathname === "/";
  const navigate = useNavigate();

  const handleLogout = () => {
    resetQuote();
    logout();
    navigate("/")
  }

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navRight}>
          <h1 className={styles.title}>AR Arts</h1>
        </div>
        {!isSignInPage && (
          <nav className={styles.navBarLeft}>
            <NavLink to="/view-quotes">View Quotes</NavLink>
            <NavLink to="/" onClick={handleLogout}>Sign Out</NavLink>
          </nav>
        )}
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
