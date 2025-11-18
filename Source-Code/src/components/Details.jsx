import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const { state } = useLocation();
  const webcamRef = useRef(null);
  const [employee, setEmployee] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  // Load employee data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("selectedEmployee");
    if (savedData) {
      setEmployee(JSON.parse(savedData));
    }
  }, []);

  // Capture photo
 const capturePhoto = () => {
  const imageSrc = webcamRef.current.getScreenshot();
  // Pass captured image directly in navigate
  navigate("/photo", { state: { photo: imageSrc, employee } });
};

  if (!employee) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        No employee data found.
      </p>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7f8fc, #e2ecff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "50vw",
          // maxWidth: "450px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
          padding: "25px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#2b2d42" }}>Employee Details</h2>

        {/* Employee Info */}
        <div
          style={{
            textAlign: "left",
            background: "#fafafa",
            padding: "15px 20px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        >
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Office:</strong> {employee.office}</p>
          <p><strong>Extension:</strong> {employee.extension}</p>
          <p><strong>Start Date:</strong> {employee.startDate}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
        </div>

        <h3 style={{ marginBottom: "10px", color: "#2b2d42" }}>
          {photo ? "Captured Photo" : "Camera Preview"}
        </h3>

        {/* Webcam or Captured Photo */}
        {!photo ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                width: "100%",
                maxWidth: "350px",
                aspectRatio: "4/3",
                borderRadius: "12px",
                border: "1px solid #ccc",
                marginBottom: "15px",
                objectFit: "cover",
              }}
              videoConstraints={{
                facingMode: "environment", // use back camera for mobile
              }}
            />

            <button
              onClick={capturePhoto}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                color: "white",
                border: "none",
                padding: "12px 0",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Capture Photo
            </button>
          </>
        ) : (
          <>
            <img
              src={photo}
              alt="Captured"
              style={{
                width: "100%",
                maxWidth: "350px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                marginBottom: "15px",
              }}
            />

            <button
              onClick={() => setPhoto(null)}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #ff512f, #dd2476)",
                color: "white",
                border: "none",
                padding: "12px 0",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Retake Photo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
