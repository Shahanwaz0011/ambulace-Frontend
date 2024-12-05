import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "../storeing-data/auth"; // Import the AuthContext

const MapComponent = () => {
  const { authorizationToken } = useAuth(); // Access the authorizationToken from AuthContext
  const [drivers, setDrivers] = useState([]); // State to store the drivers' location
  const [userLocation, setUserLocation] = useState(null); // State to store the user's location
  const [isUserOnline, setIsUserOnline] = useState(false); // State to track user's online status
  const [mapCenter, setMapCenter] = useState([21.2168, 81.4292]); // Default map center

  const mapRef = useRef(null); // Ref to the map container

  const [lastLocationUpdate, setLastLocationUpdate] = useState(Date.now()); // Track last location update time

  // Function to fetch drivers' locations
  const updateDriversLocation = async () => {
    try {
      const response = await fetch("https://ambulance-backend-912.vercel.app/api/auth/get-drivers");
      const data = await response.json();
      if (data && data.drivers) {
        // Filter only online drivers
        const onlineDrivers = data.drivers.filter((driver) => driver.isOnline);
        setDrivers(onlineDrivers);
      } else {
        console.error("No drivers data found");
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  // Fetch drivers on initial load and update every 1 second
  useEffect(() => {
    updateDriversLocation();
    const intervalId = setInterval(updateDriversLocation, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Runs once when the component mounts

  // Function to update user's location and send it to backend
  const updateUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]); // Set initial map center to user's location
          setIsUserOnline(true); // Mark user as online

          // Update the last location update time
          setLastLocationUpdate(Date.now());

          // Send updated location to the backend
          try {
            const response = await fetch('https://ambulance-backend-912.vercel.app/api/auth/update-location', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationToken, // Pass the token directly without "Bearer" prefix
              },
              body: JSON.stringify({ lat: latitude, lng: longitude }),
            });

            const data = await response.json();
            if (!response.ok) {
              console.error("Failed to update location:", data.error);
            }
          } catch (error) {
            console.error("Error sending location to backend:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    }
  };

  // Update user's location every 1 second
  useEffect(() => {
    const locationIntervalId = setInterval(updateUserLocation, 1000);
    return () => {
      clearInterval(locationIntervalId);
    };
  }, [authorizationToken]); // Make sure to use authorizationToken as a dependency

  // Common marker icon for both user and drivers
  const commonMarkerIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  // Set map center initially based on user location
  useEffect(() => {
    if (userLocation && mapRef.current) {
      const map = mapRef.current;
      map.setView(userLocation, 13, { animate: true, duration: 1.5 }); // Animate the view to user's location
    }
  }, [userLocation]);

  return (
    <MapContainer
      ref={mapRef}
      center={mapCenter} // Use the state mapCenter for initial location
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      whenCreated={(map) => {
        mapRef.current = map;

        // Disable centering on drag or zoom
        map.on('moveend', () => {
          // Prevent automatic centering after user drags or zooms the map
          if (userLocation) {
            map.setView(userLocation, 13, { animate: false }); // Revert back to user's location on moveend
          }
        });
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Show user's location marker */}
      {userLocation && (
        <Marker position={userLocation} icon={commonMarkerIcon}>
          <Popup>
            <strong>Your Location</strong><br />
            Latitude: {userLocation[0]}<br />
            Longitude: {userLocation[1]}<br />
            Status: {isUserOnline ? "Online" : "Offline"}
          </Popup>
        </Marker>
      )}

      {/* Show drivers' location markers */}
      {drivers.map((driver) => {
        const driverLat = driver.location.coordinates[1];
        const driverLon = driver.location.coordinates[0];
        return (
          <Marker key={driver._id} position={[driverLat, driverLon]} icon={commonMarkerIcon}>
            <Popup>
              <strong>{driver.name}</strong><br />
              Phone: {driver.phone}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
