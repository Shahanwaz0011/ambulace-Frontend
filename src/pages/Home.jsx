import React from "react";
import MapComponent from "../components/MapComponent";
import { useAuth } from "../storeing-data/auth"; // Import the useAuth hook
import styles from "./Home.module.css"; // Import the CSS module for styling

const Home = () => {
  const { user } = useAuth(); // Get the user data from the context

  // Example drivers data
  const drivers = [
    {
      name: "John Doe",
      contactNumber: "+1234567890",
      distance: "5 miles"
    },
    {
      name: "Jane Smith",
      contactNumber: "+0987654321",
      distance: "3 miles"
    },
    {
      name: "Emily Johnson",
      contactNumber: "+1122334455",
      distance: "7 miles"
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Welcome to the AmbuSpot</h1>
        {user ? (
          <p className={styles.userGreeting}>Welcome, {user.name}!</p>
        ) : (
          <p className={styles.loadingText}>Available Ambulance in your nearby
          Find details below  :</p>
        )}
      </header>

      <section className={styles.infoSection}>
        <p className={styles.infoText}>Find the details and track real-time location of Ambulance drivers in your area.</p>
      </section>

      {/* Single Contact Card with Table */}
      <section className={styles.contactCard}>
        <h2>Available Drivers</h2>
        <table className={styles.driverTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.name}</td>
                <td>{driver.contactNumber}</td>
                <td>{driver.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Render MapComponent inside the container */}
      <section className={styles.mapContainer}>
        <MapComponent />
      </section>
    </div>
  );
};

export default Home;
