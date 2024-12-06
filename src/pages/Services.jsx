import React from "react";
import styles from "./Services.module.css";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Real-Time Ambulance Tracking and Booking",
      description:
        "Easily locate, book, and track ambulances in real-time. Stay updated with ETA and directly connect with the driver.",
    },
    {
        id: 2,
        title: "Hospital Availability Check",
        description:
          "Find nearby hospitals with available ICU beds, emergency wards, or specialized treatment facilities.",
      },

    {
      id: 3,
      title: "First-Aid Instructions for Users",
      description:
        "Access instant AI-powered first-aid guidance tailored to the emergency until professional help arrives.",
    },
   
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Our Services</h1>
      </header>
      <section className={styles.cardGrid}>
        {services.map((service) => (
          <div key={service.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{service.title}</h2>
            <p className={styles.cardDescription}>{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Services;
