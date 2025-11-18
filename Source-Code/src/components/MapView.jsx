import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

// Custom blue marker icon (so it displays properly)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView() {
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("mapData");
    if (savedData) {
      const data = JSON.parse(savedData);

      // Simple city-to-coordinates mapping
      const cityCoords = {
        Tokyo: [35.6762, 139.6503],
        "New York": [40.7128, -74.006],
        "San Francisco": [37.7749, -122.4194],
        Edinburgh: [55.9533, -3.1883],
        London: [51.5074, -0.1278],
        Bangalore: [12.9716, 77.5946],
        Sidney: [33.8727, 151.2057],
        Singapore: [1.3521, 103.8198],
      };

      // Filter only cities that exist in our map list
      const filtered = data.filter((emp) => cityCoords[emp.office]);
      setMarkers(
        filtered.map((emp) => ({
          ...emp,
          coords: cityCoords[emp.office],
        }))
      );
    }
  }, []);

  if (!markers || markers.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>No data found</h2>
        <button
          onClick={() => navigate("/list")}
          style={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🌍 Employee Offices Map
      </h2>
      <MapContainer
        center={[20.5937, 78.9629]} // India center
        zoom={2}
        style={{ height: "500px", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {markers.map((emp, index) => (
          <Marker key={index} position={emp.coords}>
            <Popup>
              <b>{emp.name}</b> <br />
              {emp.position} <br />
              {emp.office}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/list")}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to List
        </button>
      </div>
    </div>
  );
}
