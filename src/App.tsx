import Home from "./pages/Home/Home.tsx";
import LogIn from "./pages/LogIn/LogIn.tsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/Home/SignUp/SignUp.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
