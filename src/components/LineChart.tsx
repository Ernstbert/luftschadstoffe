import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { NoxData } from "./Dashboard";
Chart.register(...registerables);

interface Props {
  data: NoxData[];
  selectedCategories: string[];
}

const getYearKeys = (row: NoxData) =>
  Object.keys(row).filter((key) => /^\d{9,}$/.test(key));

const LineChart: React.FC<Props> = ({ data, selectedCategories }) => {
  if (!data || data.length === 0) return <div>No data available.</div>;

  const yearKeys = getYearKeys(data[0]);
  const years = yearKeys.map((ts) => new Date(Number(ts)).getFullYear().toString());

  const datasets = data
    .filter((row) => selectedCategories.includes(row["Emission source categories"]))
    .map((row, idx) => ({
      label: row["Emission source categories"],
      data: yearKeys.map((ts) => Number(row[ts])),
      fill: false,
      borderColor: `hsl(${(idx * 60) % 360}, 70%, 50%)`,
      tension: 0.2,
    }));

  return (
    <Line
      data={{
        labels: years,
        datasets,
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: { ticks: { autoSkip: true, maxTicksLimit: 12 } },
        },
      }}
    />
  );
};

export default LineChart;