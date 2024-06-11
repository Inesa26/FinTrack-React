import Home from "./pages/Home/Home.tsx";
import LogIn from "./pages/LogIn/LogIn.tsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp.tsx";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import IconList from "./components/List/IconList.tsx";
import CategoryForm from "./components/Form/CategoryForm.tsx";

export default function App() {
  return (
    <HelmetProvider>
        <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/afterLogin" element={<CategoryForm />} />
    </Routes>
    </AuthProvider>
    </HelmetProvider>
  );
}
