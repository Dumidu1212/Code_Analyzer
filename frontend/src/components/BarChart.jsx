import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Analysis Metrics",
        data: data.values,
        backgroundColor: data.values.map((_, index) => {
          // Assign a different color for each bar
          const colors = [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ];
          return colors[index % colors.length]; // Loop through colors if more bars than colors
        }),
        borderColor: data.values.map((_, index) => {
          // Assign a corresponding border color for each bar
          const borderColors = [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ];
          return borderColors[index % borderColors.length];
        }),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
