import React from "react";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { BsCircleFill } from "react-icons/bs";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = () => {
  const { isPaused, setIsPaused, sensorData, sensors } = useContext(MyContext);
  const [lastRenderedData, setLastRenderedData] = useState([]);

  console.log(sensorData)

  useEffect(() => {
    if (!isPaused) {
      setLastRenderedData(sensorData);
    }
  }, [sensorData, isPaused]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const labels = Array.from({ length: 1 }, (_, index) => index + 1);

  const dataHumedades = {
    labels: labels,
    datasets: [
      {
        label: "Humedad 1",
        data: lastRenderedData
          .map((item, index) =>
            index === lastRenderedData.length - 1 ? item.humidity : null
          )
          .filter((value) => value !== null),
        backgroundColor: "#D2BA89",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#D2BA89",
      },
      {
        label: "Media ponderada",
        data: lastRenderedData
          .map((item, index) => {
            const weightedAverage = Math.round(
              item.humidity * 0.6 + item.humidity2 * 0.4
            );
            return index === lastRenderedData.length - 1
              ? weightedAverage
              : null;
          })
          .filter((value) => value !== null),
        backgroundColor: "#9D782F",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#9D782F",
      },
      {
        label: "Humedad 2",
        data: lastRenderedData
          .map((item, index) =>
            index === lastRenderedData.length - 1 ? item.humidity2 : null
          )
          .filter((value) => value !== null),
        backgroundColor: "#c5983e",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        borderColor: "#c5983e",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <section aria-labelledby="section-2-title">
      <h2 className="sr-only" id="section-2-title text-white">
        Section title
      </h2>
      <div className="overflow-hidden rounded-lg bg-night-100 shadow">
        <div className="p-6 text-white">
          <h3 className="text-gray-300 text-center">SENSORES</h3>

          <div className="flex justify-center items-center mb-4 space-x-2">
            <h2 className=" font-medium text-center text-xl">
              HUMEDAD EN VIVO
            </h2>
            <div className="flex items-center text-red-500">
              <BsCircleFill className="w-2 h-2" />
            </div>
          </div>

          <div className="relative">
            <h2 className="text-center font-medium text-6xl mt-10">
              {lastRenderedData[lastRenderedData.length - 1] &&
                Math.round(
                  lastRenderedData[lastRenderedData.length - 1].humidity * 0.6 +
                    lastRenderedData[lastRenderedData.length - 1].humidity2 *
                      0.4
                )}%
            </h2>
            <Bar
              data={dataHumedades}
              options={options}
              className="mt-8 mb-8"
            />
          </div>

          {/* <div className="flex mt-10">
            <div className="flex items-center space-x-3 flex-1 text-sm text-gray-200 font-medium">
              <div className="bg-[#D2BA89] w-3 h-3 rounded-full"></div>
              <h3>Sensor 1: {humidity.humidityA}%</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
              <div className="bg-[#C5983E] w-3 h-3 rounded-full"></div>
              <h3>Sensor 2: {humidity.humidityB}%</h3>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default DoughnutChart;
