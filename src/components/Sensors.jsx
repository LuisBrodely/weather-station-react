import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import database from "../util/firebase";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { IoWaterOutline } from "react-icons/io5";
import { BiWater } from "react-icons/bi";
import { RiWindyLine } from "react-icons/ri";
import { SunIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Sensors = () => {
  
  const { sensors, comparation } = useContext(MyContext);
  
  return (
    <div className="p-0 grid grid-cols-2 grid-rows-2 gap-3 h-96 mt-8">
      <div className="bg-[#D2BA89] flex p-8 rounded items-center">
        <IoWaterOutline size={60} color="white" />
        <div className="flex-1 ml-4">
          <p className="text-base font-medium text-gray-200 mb-1">Humedad</p>
          <h6 className="text-white text-4xl font-semibold">
            {sensors && sensors.humidity}%
          </h6>
        </div>
        <div className="flex items-center">
          {comparation && sensors && comparation.humidity > sensors.humidity ? (
            <GoTriangleDown size={24} color="#D8876F" />
          ) : (
            <GoTriangleUp size={24} color="#C95B38" />
          )}
          <h6 className="text-md font-medium ml-1 text-gray-200">
            {comparation &&
              sensors &&
              Math.abs(comparation.humidity - sensors.humidity)}
            %
          </h6>
        </div>
      </div>

      <div className="bg-[#886B59] flex p-8 rounded items-center">
        <RiWindyLine size={60} color="white" />
        <div className="flex-1 ml-4">
          <p className="text-base font-medium text-gray-200 mb-1">
            Calidad del aire
          </p>
          <h6 className="text-white text-4xl font-semibold">
            {sensors && sensors.air} AQY
          </h6>
        </div>
        <div className="flex items-center">
          {comparation && sensors && comparation.air > sensors.air ? (
            <GoTriangleDown size={24} color="#D8876F" />
          ) : (
            <GoTriangleUp size={24} color="#C95B38" />
          )}
          <h6 className="text-md font-medium ml-1 text-gray-200">
            {comparation && sensors && Math.abs(comparation.air - sensors.air)}{" "}
            AQY
          </h6>
        </div>
      </div>

      <div className="bg-[#A0472C] flex p-8 rounded items-center">
        <BiWater size={60} color="white" />
        <div className="flex-1 ml-4">
          <p className="text-base font-medium text-gray-200 mb-1">Presion</p>
          <h6 className="text-white text-4xl font-bold">
            {sensors && sensors.presure} Pa
          </h6>
        </div>
        <div className="flex items-center">
          {comparation && sensors && comparation.presure > sensors.presure ? (
            <GoTriangleDown size={24} color="#D8876F" />
          ) : (
            <GoTriangleUp size={24} color="#C95B38" />
          )}
          <h6 className="text-md font-medium ml-1 text-gray-200">
            {comparation &&
              sensors &&
              Math.abs(comparation.presure - sensors.presure)}{" "}
            Pa
          </h6>
        </div>
      </div>

      <div className="bg-[#402923] flex p-8 rounded items-center">
        <SunIcon width={60} color="white" />
        <div className="flex-1 ml-4">
          <p className="text-base font-medium text-gray-200 mb-1">
            Temperatura
          </p>
          <h6 className="text-white text-4xl font-semibold">
            {sensors && Math.round(sensors.temp)}°C
          </h6>
        </div>
        <div className="flex items-center">
          {comparation && sensors && comparation.temp > sensors.temp ? (
            <GoTriangleDown size={24} color="#D8876F" />
          ) : (
            <GoTriangleUp size={24} color="#C95B38" />
          )}
          <h6 className="text-md font-medium ml-1 text-gray-200">
            {comparation &&
              sensors &&
              Math.round(comparation.temp - sensors.temp)}
            °C
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Sensors;
