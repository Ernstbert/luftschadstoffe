import React from "react";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div
      style={{
        padding: "2vw",
        maxWidth: "100vw",
        minHeight: "100vh",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
        background: "#f8f9fa",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", wordBreak: "break-word" }}>
        NOx Emissions Dashboard
      </h1>
      <Dashboard />
    </div>
  );
}

export default App;