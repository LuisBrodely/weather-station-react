import { Line } from "react-chartjs-2";
import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../context/MyContext";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  const { humedadData, humedades, isPaused, setIsPaused, sensorData } =
    useContext(MyContext);
  const [lastRenderedData, setLastRenderedData] = useState([]);

  useEffect(() => {
    if (!isPaused) {
      setLastRenderedData(sensorData);
    }
  }, [sensorData, isPaused]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const labels = Array.from({ length: 20 }, (_, index) => index + 1);

  const dataAire = {
    labels: labels,
    datasets: [
      {
        label: "Calidad aire",
        data: lastRenderedData.map((item) => item.air),
        backgroundColor: "#886B59",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#886B59",
      },
    ],
  };

  const dataHumedades = {
    labels: labels,
    datasets: [
      {
        label: "Humedad 1",
        data: lastRenderedData.map((item) => item.humidity),
        backgroundColor: "#D2BA89",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#D2BA89",
      },
      {
        label: "Humedad 2",
        data: lastRenderedData.map((item) => item.humidity2),
        backgroundColor: "#c5983e",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#c5983e",
      },
      {
        label: "Media ponderada",
        data: lastRenderedData.map((item) => Math.round((item.humidity * 0.6) + (item.humidity2 * 0.4))),
        backgroundColor: "#9D782F",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#9D782F",
      },
    ],
  };

  const dataPresion = {
    labels: labels,
    datasets: [
      {
        label: "Presion",
        data: lastRenderedData.map((item) => item.presure),
        backgroundColor: "#A0472C",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#A0472C",
      },
    ],
  };

  const dataTemperatura = {
    labels: labels,
    datasets: [
      {
        label: "Temperatura",
        data: lastRenderedData.map((item) => item.temp),
        backgroundColor: "#69433A",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#69433A",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },
    },
  };
  
  return (
    <div className="px-4 mt-8 ">
      <div className="flex mb-20">
        <h2 className="text-white font-medium text-3xl flex-1">Graficas en vivo</h2>
        <button
          onClick={handlePause}
          type="button"
          className="items-center justify-center rounded-md border border-transparent bg-jasper-100 px-4 py-2 text-sm font-medium text-white shadow-sm max-w-[100px]"
        >
          {isPaused ? "Continuar" : "Pausar"}
        </button>{" "}
      </div>
      <Line data={dataHumedades} options={options} className="mb-10"/>
      <Line data={dataAire} options={options} className="mb-10" />
      <Line data={dataPresion} options={options} className="mb-10" />
      <Line data={dataTemperatura} options={options} className="mb-10" />
    </div>
  );
};

export default LineChart;
