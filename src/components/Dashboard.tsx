import React, { useState } from "react";
import noxData from "../data/nox.json";
import LineChart from "./LineChart";

export interface NoxData {
  "Emission source categories": string;
  "Zeitreihen-ID": string | null;
  [year: string]: string | number | null;
}

// Get all categories from the data
const categories = noxData.map((row: NoxData) => row["Emission source categories"]);

// Default selected: only "Energy Industries"
const defaultCategory = "1. Energy Industries";

const Dashboard: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([defaultCategory]);

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            style={{
              background: selected.includes(cat) ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              marginBottom: "0.5rem",
              wordBreak: "break-word",
              flex: "1 1 180px",
              minWidth: "120px",
              maxWidth: "100%",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 180px)",
          maxHeight: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LineChart data={noxData} selectedCategories={selected} />
      </div>
    </div>
  );
};

export default Dashboard;