import { Link } from "react-router-dom";
import { useAuth } from "../storeing-data/auth"; // Assuming you have an auth context or hook
import styles from "./Nav.module.css"; // Import styling for the Nav
import ToggleStatus from "./ToggleStatus"; // Assuming this handles driver status toggling

const Navbar = () => {
  const { user } = useAuth(); // Assuming useAuth provides user and login/logout functions

  return (
    <nav className={styles.navbar}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <Link to="/" className={styles.logoText}>
          Ambulance Tracker
        </Link>
      </div>
      {/* Navigation Links */}
      <div className={styles.menu}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
         
          <li>
            <Link to="/services" className={styles.navLink}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/hospital" className={styles.navLink}>
              Hospital Availability
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
        </ul>
      </div>
      {/* User Controls */}
      <div className={styles.userControls}>
        {/* Show ToggleStatus if user is a driver */}
        {user && user.type === "driver" && (
          <div className={styles.statusToggle}>
            <ToggleStatus user={user} />
          </div>
        )}
        {/* Authentication Buttons */}
        <div className={styles.authButtons}>
          {user ? (
            <Link to="/logout" className={styles.navLink}>
              <button className={styles.actionButton}>Logout</button>
            </Link>
          ) : (
            <Link to="/login" className={styles.navLink}>
              <button className={styles.actionButton}>Login</button>
            </Link>
          )}
        </div>
@@ -48,3 +70,4 @@ const Navbar = () => {
};

export default Navbar;

