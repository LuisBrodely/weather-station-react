import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../context/MyContext";

const Tables = () => {
  const { sensorData, isPaused, setIsPaused } = useContext(MyContext);
  const [lastRenderedData, setLastRenderedData] = useState([]);

  useEffect(() => {
    if (!isPaused) {
      setLastRenderedData(sensorData.reverse());
    }
  }, [sensorData, isPaused]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="px-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-pearl-100">
            Tablas de datos en tiempo real
          </h1>
          <p className="mt-2 text-sm text-gray-200 font-medium">
            Es una lista de los 20 ultimos datos que se van mostrando y actualizando
            dinamicamente.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={handlePause}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-jasper-100 px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto"
          >
            {isPaused ? "Continuar" : "Pausar"}
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-white sm:pl-6 bg-[#D2BA89]"
                    >
                      Humedad
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-white bg-[#A0472C]"
                    >
                      Presion
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-white bg-[#886B59]"
                    >
                      Calidad del aire
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-white sm:pr-6 bg-[#402923]"
                    >
                      Temperatura
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-400 bg-white">
                  {lastRenderedData.map((sensor, index) => (
                    <tr key={index} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                        {sensor.humidity2}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-900 font-medium">
                        {sensor.presure}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-900 font-medium">
                        {sensor.air}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pr-6 font-medium">
                        {Math.round(sensor.temp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
