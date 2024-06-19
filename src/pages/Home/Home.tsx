import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/HomeHeader/Header.tsx";
import MainContent from "../../components/Home/MainContent/MainContent.tsx";
import Navbar from "../../components/Home/Navbar/Navbar.tsx";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="home">
        <Navbar />
        <Header />
        <MainContent />
      </div>
    </>
  );
}
