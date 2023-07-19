import React from "react";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { BsCircleFill } from "react-icons/bs";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {

  const data = {
    datasets: [
      {
        label: ["Media Ponderada"],
        data: [56, 44],
        backgroundColor: ["#A4C695", "#1F1F1F"],
        borderColor: "transparent",
      },
      {
        label: ["Sensor 2"],
        data: [50, 40],
        backgroundColor: ["#c5983e", "#292929"],
        borderColor: "transparent",
      },
      {
        label: ["Sensor 1"],
        data: [53, 47],
        backgroundColor: ["#D2BA89", "#333333"],
        borderColor: "transparent",
      },
    ],
  };

  const { humedadData, humedades } = useContext(MyContext);
  console.log(humedades);

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
              50%
            </h2>
          </div>

          <div className="flex mt-10">
            <div className="flex items-center space-x-3 flex-1 text-sm text-gray-200 font-medium">
              <div className="bg-[#D2BA89] w-3 h-3 rounded-full"></div>
              <h3>Sensor 1: {humedades.humidity}%</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
              <div className="bg-[#C5983E] w-3 h-3 rounded-full"></div>
              <h3>Sensor 2: {humedades.humidity2}%</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoughnutChart;
