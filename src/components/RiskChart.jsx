import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { riskData } from "../data/data";
import arrow from "../assets/double-arrow.png";

const RiskChart = () => {
  const riskLevels = [
    {
      level: "High risk",
      context: "Strong need for innovation",
      color: "rgba(255, 99, 132, 0.9)",
    },
    {
      level: "Medium risk",
      context: "Need for innovation",
      color: "rgba(255, 206, 86, 0.7)",
    },
    {
      level: "Low risk",
      context: "Low need for innovation",
      color: "rgba(75, 192, 192, 0.8)",
    },
  ];

  // Prepare the chart data
  const chartData = {
    labels: riskData.map((item) => item.category),
    datasets: [
      {
        label: "Risk Level",
        data: riskData.map((item) => item.score),
        backgroundColor: riskData.map((item) => {
          if (item.score < 4) return "rgba(75, 192, 192, 0.8)"; // Low Risk
          if (item.score < 7) return "rgba(255, 206, 86, 0.7)"; // Medium Risk
          return "rgba(255, 99, 132, 0.9)"; // High Risk
        }),
        borderRadius: 10,
        barThickness: 20,
      },
    ],
  };

  // Prepare the chart options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => value.toFixed(1),
        color: "purple",
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
          font: {
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-flow-col">
      <div className="flex flex-col items-center bg-purple-300 p-4 rounded-lg shadow-lg">
        <div className="flex gap-1 justify-evenly w-full mt-2 md:pb-0 pb-4 md:ps-8 ps-20">
          {riskData.map((item) => (
            <span
              key={item.topLabel}
              className="text-xs font-medium text-black text-center w-1/5"
            >
              {item.topLabel}
            </span>
          ))}
        </div>
        <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
        <div className="flex lg:gap-0 sm:gap-2 w-full md:mt-2 mt-5 ps-8 md:pb-0 pb-10">
          {riskData.map((item) => (
            <span
              key={item.bottomLabel}
              className="font-semibold text-sm text-black text-center w-1/5"
            >
              {item.bottomLabel}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-stretch h-full mx-4 pt-12 pb-20">
        {riskLevels.map((riskLevel, index) => (
          <div key={index} className="flex items-center gap-2">
            <img src={arrow} alt="arrow" className="sm:w-[8.8px] w-[9.3px]" />
            <div className="text-left">
              <span className="font-bold text-sm">{riskLevel.level}</span>
              <p className="sm:block hidden text-gray-400 font-medium"> {riskLevel.context} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskChart;
