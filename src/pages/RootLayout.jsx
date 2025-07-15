import { Outlet, NavLink, useLocation } from "react-router-dom";
import styles from "./RootLayout.module.css";

function RootLayout() {
  const location = useLocation();
  const isSignInPage = location.pathname === "/";

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navRight}>
          <h1 className={styles.title}>AR Arts</h1>
        </div>
        {!isSignInPage && (
          <nav className={styles.navBarLeft}>
            <NavLink to="/view-quotes">View Quotes</NavLink>
            <NavLink to="/">Sign Out</NavLink>
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
