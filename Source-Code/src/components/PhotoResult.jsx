import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PhotoResult() {
  const { state } = useLocation();
  const photo = state?.photo;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedPhoto = localStorage.getItem("capturedPhoto");
  //   if (savedPhoto) {
  //     setPhoto(savedPhoto);
  //   }
  // }, []);

  if (!photo) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        No captured photo found.
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
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
          padding: "25px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#2b2d42" }}>
          Captured Photo
        </h2>
        <img
          src={photo}
          alt="Captured"
          style={{
            width: "320px",
            height: "240px",
            borderRadius: "10px",
            border: "2px solid #444",
          }}
        />

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Retake Photo
          </button>
        </div>
      </div>
    </div>
  );
}
