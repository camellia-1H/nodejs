import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Login from "./page/Login";
import Register from "./page/Register";

function App() {
  return (
    <div className="flex justify-center items-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
