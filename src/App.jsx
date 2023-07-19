import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyProvider } from "./context/MyContext.jsx";
import Register from "./screens/Register.jsx";
import Login from "./screens/Login.jsx";
import Dashboard from "./screens/Dashboard";
import Tables from "./components/Tables.jsx";

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
