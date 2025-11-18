import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/backend_dev/gettabledata.php", {
          username: "test",
          password: "123456",
        });

        const rawData = res.data?.TABLE_DATA?.data;
        if (Array.isArray(rawData)) {
          const formatted = rawData.map((item) => ({
            name: item[0],
            position: item[1],
            office: item[2],
            extension: item[3],
            startDate: item[4],
            salary: item[5],
          }));
          setData(formatted);
        } else {
          setError("Unexpected data format received from API");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h2>Employee Directory</h2>

      {/* Buttons for Graph and Map */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => {
            localStorage.setItem("graphData", JSON.stringify(data));
            window.open("/bargraph", "_blank");
          }}
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          View Salary Graph
        </button>

        <button
          onClick={() => {
            localStorage.setItem("mapData", JSON.stringify(data));
            window.open("/map", "_blank");
          }}
          style={{
            background: "linear-gradient(90deg, #11998e, #38ef7d)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          View City Map
        </button>
      </div>

      {/* Table Container */}
      <div
        style={{
          overflowX: "auto",
          maxHeight: "70vh",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Extension</th>
              <th>Start Date</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp, index) => (
              <tr
                key={index}
                onClick={() => {
                  localStorage.setItem("selectedEmployee", JSON.stringify(emp));
                  window.open(`/details/${index}`, "_blank");
                }}
                style={{ cursor: "pointer" }}
              >
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.office}</td>
                <td>{emp.extension}</td>
                <td>{emp.startDate}</td>
                <td>{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
