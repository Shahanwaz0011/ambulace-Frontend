import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../storeing-data/auth"; // Use Auth Context for token
import styles from "./ToggleStatus.module.css"; // Import CSS for styling

const ToggleStatus = () => {
  const { authorizationToken, user } = useAuth(); // Extract user and token from context
  const [isOnline, setIsOnline] = useState(user?.isOnline || false); // Initialize based on user's status
  const [loading, setLoading] = useState(false); // Track API call status
  const [error, setError] = useState(""); // Track errors

  // Function to toggle the driver's online status
  const handleToggle = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.patch(
        `https://ambulance-backend-912.vercel.app/api/auth/driver/set-status/${user._id}`,
        { isOnline: !isOnline },
        {
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsOnline(!isOnline); // Update the online status
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      setError(
        err.response?.data?.message || "Failed to update status. Please try again."
      );
    } finally {
      setLoading(false); // Ensure loading stops in all cases
    }
  };

  return (
    <div className={styles.toggleContainer}>
      <label className={styles.toggleLabel}>
        <div className={`${styles.switch} ${loading ? styles.disabled : ""}`}>
          <input
            type="checkbox"
            checked={isOnline}
            onChange={handleToggle}
            disabled={loading}
            className={styles.toggleInput}
          />
          <span className={styles.slider}></span>
        </div>
      </label>
      {/* Show loading state */}
      {loading && <p className={styles.loadingMessage}>Updating status...</p>}
      {/* Show error messages if any */}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {/* Display current status */}
      <p className={styles.statusMessage}>
        {isOnline ? "You are Online" : "You are Offline"}
      </p>
    </div>
  );
};

export default ToggleStatus;
