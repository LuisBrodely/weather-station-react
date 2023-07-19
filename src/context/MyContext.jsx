import { createContext, useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import database from "../util/firebase";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [sensors, setSensors] = useState(0);
  const [comparation, setComparation] = useState(0);
  const [sensorData, setSensorData] = useState([]);

  const [humedades, setHumedades] = useState(0);
  const [humedadData, setHumedadData] = useState([]);

  const [isPaused, setIsPaused] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(true);

  useEffect(() => {
    const sensoresRef = ref(database, "datos_sensores");

    const unsubscribe = onValue(sensoresRef, (snapshot) => {
      const sensorsValue = snapshot.val();
      const keys = Object.keys(sensorsValue);
      const lastKey = keys[keys.length - 1];
      const lastElement = sensorsValue[lastKey];
      setSensors(lastElement);

      const lastKey2 = keys[keys.length - 2];
      const lastElement2 = sensorsValue[lastKey2];
      setComparation(lastElement2);

      const newData = keys.map((key) => sensorsValue[key]);
      const last20Elements = newData.slice(-20);
      setSensorData(last20Elements);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const sensoresRef = ref(database, "datos_humedades");

    const unsubscribe = onValue(sensoresRef, (snapshot) => {
      const sensorsValue = snapshot.val();
      const keys = Object.keys(sensorsValue);
      const lastKey = keys[keys.length - 1];
      const lastElement = sensorsValue[lastKey];
      setHumedades(lastElement);
      console.log(lastElement)

      const newData = keys.map((key) => sensorsValue[key]);
      const last20Elements = newData.slice(-20);
      setHumedadData(last20Elements);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = {
    sensors,
    comparation,
    sensorData, 
    humedades,
    humedadData,
    isPaused, 
    setIsPaused,
    authenticated,
    setAuthenticated,
    user,
    setUser
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
