import React from "react";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { BsCircleFill } from "react-icons/bs";
import { useMemo } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { isPaused, setIsPaused, sensorData, sensors } =
    useContext(MyContext);
  const [lastRenderedData, setLastRenderedData] = useState({
    humidity: 0,
    humidity2: 0,
    humidity3: 0,
  });

  useEffect(() => {
    if (!isPaused) {
      setLastRenderedData({
        humidity: sensors.humidity,
        humidity2: sensors.humidity2,
        humidity3: sensors.humidity3,
      });
    }
  }, [sensorData, isPaused]);

  const data = {
    datasets: [
      {
        label: ["Media Ponderada"],
        data: [
          Math.round(
            lastRenderedData.humidity * 0.6 + lastRenderedData.humidity2 * 0.4
          ),
          100 -
            Math.round(
              lastRenderedData.humidity * 0.6 + lastRenderedData.humidity2 * 0.4
            ),
        ],
        backgroundColor: ["#9D782F", "#1F1F1F"],
        borderColor: "transparent",
      },
      {
        label: ["Sensor 2"],
        data: [lastRenderedData.humidity2, 100 - lastRenderedData.humidity2],
        backgroundColor: ["#c5983e", "#292929"],
        borderColor: "transparent",
      },
      {
        label: ["Sensor 1"],
        data: [lastRenderedData.humidity, 100 - lastRenderedData.humidity],
        backgroundColor: ["#D2BA89", "#333333"],
        borderColor: "transparent",
      },
    ],
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
            <Doughnut data={data} className=" cursor-pointer" />
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-5xl">
              {Math.round(
                lastRenderedData.humidity * 0.6 +
                  lastRenderedData.humidity2 * 0.4
              )}
              %
            </h2>
          </div>

          <div className="flex mt-10">
            <div className="flex items-center space-x-3 flex-1 text-sm text-gray-200 font-medium">
              <div className="bg-[#D2BA89] w-3 h-3 rounded-full"></div>
              <h3>Sensor 1: {lastRenderedData.humidity}%</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
              <div className="bg-[#C5983E] w-3 h-3 rounded-full"></div>
              <h3>Sensor 2: {lastRenderedData.humidity2}%</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoughnutChart;
