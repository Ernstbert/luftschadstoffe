import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

interface Props {
  data: any[];
  selectedCategories: string[];
}

const LineChart: React.FC<Props> = ({ data, selectedCategories }) => {
  if (!data || data.length === 0) return <div>No data available.</div>;

  // Find all keys that are UNIX timestamps (years)
  const yearKeys = Object.keys(data[0]).filter(
    (key) => /^\d{9,}$/.test(key)
  );

  // Convert UNIX timestamps to year strings for chart labels
  const years = yearKeys.map((ts) => {
    const d = new Date(Number(ts));
    return d.getFullYear().toString();
  });

  // Build datasets for selected categories
  const datasets = data
    .filter((row) => selectedCategories.includes(row["Emission source categories"]))
    .map((row) => ({
      label: row["Emission source categories"],
      data: yearKeys.map((ts) => Number(row[ts])),
      fill: false,
      borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    }));

  // Debug output
  console.log("yearKeys:", yearKeys);
  console.log("years:", years);
  console.log("datasets:", datasets);

  return (
    <Line
      data={{
        labels: years,
        datasets,
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { ticks: { autoSkip: true, maxTicksLimit: 12 } },
        },
      }}
    />
  );
};

export default LineChart;