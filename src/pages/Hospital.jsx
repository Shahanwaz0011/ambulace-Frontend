import React from "react";
import styles from "./Hospital.module.css";

const Hospital = () => {
  // Demo data for hospitals
  const hospitals = [
    { name: "City Hospital", distance: "5 km", availableBeds: 15, icu: "Yes" },
    { name: "Green Valley Hospital", distance: "6 km", availableBeds: 8, icu: "No" },
    { name: "CarePlus Clinic", distance: "7 km", availableBeds: 10, icu: "Yes" },
    { name: "HealthFirst Hospital", distance: "5.5 km", availableBeds: 12, icu: "Yes" },
    { name: "Hope Medical Center", distance: "8 km", availableBeds: 20, icu: "No" },
    { name: "Healing Hands Hospital", distance: "9 km", availableBeds: 5, icu: "Yes" },
    { name: "LifeCare Hospital", distance: "10 km", availableBeds: 18, icu: "Yes" },
    { name: "Wellness Hospital", distance: "9.5 km", availableBeds: 6, icu: "No" },
    { name: "Prime Hospital", distance: "6.5 km", availableBeds: 9, icu: "Yes" },
    { name: "Golden Health Center", distance: "7.5 km", availableBeds: 14, icu: "Yes" },
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Nearby Hospitals</h1>
      </header>
      <section className={styles.tableSection}>
        <table className={styles.hospitalTable}>
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Distance</th>
              <th>Available Beds</th>
              <th>ICU Availability</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital, index) => (
              <tr key={index}>
                <td>{hospital.name}</td>
                <td>{hospital.distance}</td>
                <td>{hospital.availableBeds}</td>
                <td>{hospital.icu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Hospital;
