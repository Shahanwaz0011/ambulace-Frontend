import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>About AmbuSpot</h1>
      </header>
      <section className={styles.contentSection}>
        <p className={styles.paragraph}>
          AmbuSpot is a transformative platform that revolutionizes how emergency medical services connect with patients. By leveraging real-time GPS technology, we bridge the critical gap in emergency response systems, ensuring ambulances are dispatched faster and more efficiently.
        </p>
        <p className={styles.paragraph}>
          Our intuitive interface empowers users to locate nearby ambulances, connect with drivers, and track their progress—all in real time. This system is designed not only for patients but also for hospitals, caregivers, and emergency responders who strive for faster action during critical situations.
        </p>
        <p className={styles.paragraph}>
          At AmbuSpot, we believe that every second counts in an emergency. Join us in our mission to make healthcare accessible, reliable, and effective, helping save lives when it matters most.
        </p>
      </section>
    </div>
  );
};

export default About;
