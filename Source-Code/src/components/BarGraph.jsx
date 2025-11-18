import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarGraph() {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("graphData");
    if (savedData) {
      const data = JSON.parse(savedData);
      const formattedData = data.slice(0, 10).map((emp) => ({
        name: emp.name,
        salary: Number(emp.salary.replace(/[^0-9.-]+/g, "")), // remove $ and commas
      }));
      setChartData(formattedData);
    }
  }, []);

  if (!chartData || chartData.length === 0) {
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
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        💼 Employee Salary Chart (Top 10)
      </h2>

      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#fafafa",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
