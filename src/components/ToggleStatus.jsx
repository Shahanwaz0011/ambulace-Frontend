import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../storeing-data/auth"; // Use Auth Context for token
import styles from "./ToggleStatus.module.css"; // Import CSS for styling

const ToggleStatus = () => {
  const { user, authorizationToken } = useAuth(); // Extract user and token from context
  const [isOnline, setIsOnline] = useState(user?.isOnline || false); // Initialize with user data
  const [loading, setLoading] = useState(false); // Track API call status
  const [message, setMessage] = useState(""); // Feedback message from backend
  const [error, setError] = useState(""); // Track errors

  const handleToggle = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.patch(
        `https://ambulance-backend-912.vercel.app/api/auth/driver/set-status/${user._id}`,
        { isOnline: !isOnline }, // Send the toggled status
        {
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { isOnline: newStatus, message } = response.data;
        setIsOnline(newStatus); // Update online status
        setMessage(message); // Display message from backend
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update status. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
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
      {loading && <p className={styles.loadingMessage}>Updating status...</p>}
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ToggleStatus;
