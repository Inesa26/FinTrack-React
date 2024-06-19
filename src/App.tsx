import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Home from "./pages/Home/Home.tsx";
import LogIn from "./pages/LogIn/LogIn.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";

import Layout from "./components/Layout.tsx";
import Overview from "./pages/Overview.tsx";

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/overview"
            element={
              <Layout>
                <Overview />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </HelmetProvider>
  );
}
